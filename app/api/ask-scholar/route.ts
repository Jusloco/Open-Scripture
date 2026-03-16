import Anthropic from '@anthropic-ai/sdk'
import type { VerseData } from '@/lib/types'

const client = new Anthropic()

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured. Add it to .env.local.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let question: string
  let verseData: VerseData

  try {
    const body = await req.json()
    question = body.question
    verseData = body.verseData
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!question?.trim()) {
    return new Response(JSON.stringify({ error: 'Question is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const systemPrompt = `You are a New Testament manuscript scholar and textual critic with deep expertise in Greek papyri, codices, and early Christian history. You help people understand the manuscript evidence behind Bible verses — accurately, accessibly, and without bias toward any denomination.

You have access to the following verse data for ${verseData.reference}:

Text: "${verseData.text}"
Confidence: ${verseData.confidence} (green = universally attested, yellow = significant variant, red = later addition)
Greek manuscripts: ${verseData.greek_manuscripts}
Earliest manuscript: ${verseData.earliest_manuscript.name} (${verseData.earliest_manuscript.date})
${verseData.variants.length > 0 ? `Textual variants: ${JSON.stringify(verseData.variants, null, 2)}` : 'No significant textual variants.'}
${verseData.plain_english_summary}

Answer the user's question grounded in this data. Be honest about what scholars know vs. what is uncertain. Cite specific manuscripts (P66, P75, Sinaiticus, Vaticanus, etc.) where relevant. Keep your answer focused and readable — aim for 150-300 words unless more depth is clearly needed.`

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: question.trim() }],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } catch (err) {
        controller.error(err)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
