'use client'

import { useState, useRef, useEffect } from 'react'
import { BookOpen, Send, X, RotateCcw } from 'lucide-react'

// ---------------------------------------------------------------------------
// Knowledge base — rule-based responses (no API key needed)
// ---------------------------------------------------------------------------

interface KbEntry {
  patterns: RegExp[]
  answer: string
}

const KNOWLEDGE_BASE: KbEntry[] = [
  {
    patterns: [/john\s*3\s*:?\s*16/i, /for god so loved/i],
    answer: `**John 3:16 — Manuscript Evidence**

John 3:16 is one of the most universally attested verses in the entire New Testament. Every known Greek manuscript that contains the Gospel of John includes it without significant variation.

**Earliest evidence:**
- **P66** (~175 AD) — contains John 3:16 in its earliest surviving form
- **P75** (~175–225 AD) — another early papyrus confirming the text
- **Codex Sinaiticus** (~360 AD) and **Codex Vaticanus** (~325 AD) both attest the verse identically

**Confidence:** Green (highest) — there is no serious scholarly dispute about the authenticity or wording of this verse. The Greek *monogenē* ("only begotten" or "one and only") is consistent across all manuscript traditions.

This verse is a textual criticism non-issue. All 5,800+ Greek manuscripts agree on its substance.`,
  },
  {
    patterns: [/john\s*1\s*:?\s*1/i, /in the beginning was the word/i, /was god.*a god/i, /a god.*was god/i],
    answer: `**John 1:1 — "was God" vs. "a god"**

John 1:1 ends with the Greek phrase *kai theos ēn ho logos* — "and the Word was God."

**The "a god" rendering** (used in the New World Translation of Jehovah's Witnesses) has **zero Greek manuscript support.** Not one of the 5,800+ Greek manuscripts reads *theos* with the indefinite article in a way that would require "a god" — ancient Greek has no indefinite article at all, and context determines definiteness.

**What all manuscripts actually say:**
- The Greek is *theos ēn ho logos* — the predicate nominative *theos* is anarthrous (no article), which in Greek grammar is standard for a qualitative noun, not for signaling indefiniteness.
- **P66** (~175 AD), **P75** (~175–225 AD), **Sinaiticus**, **Vaticanus**, and every other manuscript tradition read this clause the same way.

**Scholarly consensus:** Grammarians like Daniel B. Wallace and the overwhelming majority of New Testament scholars agree the correct translation is "was God," not "a god." The rendering "a god" reflects theology, not grammar or manuscript evidence.`,
  },
  {
    patterns: [/john\s*7\s*:?\s*53|john\s*8\s*:?\s*1|pericope\s*adulter|woman\s*caught\s*in\s*adulter|adulter.*woman/i],
    answer: `**John 7:53–8:11 — The Pericope Adulterae ("Woman Caught in Adultery")**

This beloved passage — where Jesus says "Let him who is without sin cast the first stone" — is one of the most famous textual variants in the New Testament.

**Why scholars question its originality:**
- **Absent from P66, P75** — the two earliest papyri of John do not contain it
- **Absent from Codex Sinaiticus (~360 AD)** and **Codex Vaticanus (~325 AD)**
- Most early Greek manuscripts (before ~900 AD) either omit it or mark it with asterisks/obeli indicating doubt
- Its vocabulary and style differ noticeably from the rest of John's Gospel
- Some manuscripts place it in Luke's Gospel, others at different locations in John

**What it means:** Most textual critics, including those across theological traditions, conclude the passage was not part of John's original Gospel. However, many scholars believe it may preserve a genuine historical tradition about Jesus.

**Confidence:** Red — the passage is absent from the earliest and most reliable manuscripts. Modern Bibles typically place it in brackets with a footnote.`,
  },
  {
    patterns: [/john\s*5\s*:?\s*4/i, /angel.*troubl|troubl.*water|angel.*pool/i],
    answer: `**John 5:4 — The Troubling of the Water**

John 5:4 describes an angel periodically stirring the pool of Bethesda, with the first person to enter after the stirring being healed. This verse is absent from the earliest manuscripts.

**Manuscript evidence:**
- **Absent from P66, P75** — the two most important early papyri of John
- **Absent from Sinaiticus and Vaticanus**
- Present in later manuscripts (Byzantine tradition) but often with scribal marks indicating doubt
- The vocabulary includes several words found nowhere else in John's Gospel

**Scholarly view:** The verse appears to be a scribal gloss — a marginal explanation that over time was incorporated into the main text to explain why people were waiting at the pool. Most modern translations either omit it or bracket it with a footnote.`,
  },
  {
    patterns: [/what\s+is\s+p52|p52|earliest.*fragment|oldest.*fragment|john\s*18\s*:?\s*3[1-3]/i],
    answer: `**P52 — The Earliest Known New Testament Fragment**

P52 (Papyrus 52, also called the *Rylands Papyrus*) is the oldest surviving fragment of any New Testament text.

**Key facts:**
- **Date:** ~100–150 AD (most scholars estimate ~125 AD)
- **Location:** John Rylands Library, Manchester, UK
- **Content:** Contains John 18:31–33 on the front and John 18:37–38 on the back — a few verses from Jesus's trial before Pilate
- **Size:** Only 9 × 6 cm (about the size of a credit card) — a tiny scrap, but enormously significant
- **Significance:** Proves the Gospel of John was circulating in Egypt within a generation or two of its composition, pushing back the timeline of the New Testament documents

**What it tells us:** Even though P52 contains only 114 legible characters, it confirms that John's Gospel existed and was being copied very early. It is a key piece of evidence against late-dating theories of John's authorship.`,
  },
  {
    patterns: [/sinaiticus|codex\s*sin|oldest\s*complete|complete.*new\s*testament/i],
    answer: `**Codex Sinaiticus — The Oldest Complete New Testament**

Codex Sinaiticus (designated **א**, Aleph) is the oldest substantially complete manuscript of the Christian Bible.

**Key facts:**
- **Date:** ~330–360 AD
- **Discovery:** Found by Constantin von Tischendorf at St. Catherine's Monastery, Mount Sinai, Egypt, in 1844–1859
- **Content:** The entire New Testament plus parts of the Old Testament (Septuagint) and two early Christian texts (*Shepherd of Hermas* and *Epistle of Barnabas*)
- **Language:** Greek uncial (capital letters, no spaces between words)
- **Current location:** Split between the British Library (London), Leipzig University Library, St. Catherine's Monastery, and the National Library of Russia

**Significance for textual criticism:**
- It is a primary witness for the *Alexandrian text-type*, considered closest to the originals
- It notably **lacks** John 7:53–8:11 and Mark 16:9–20
- The entire manuscript is digitized and freely available at codexsinaiticus.org`,
  },
  {
    patterns: [/vaticanus|codex\s*vat/i],
    answer: `**Codex Vaticanus — The Premier New Testament Manuscript**

Codex Vaticanus (designated **B**) is widely considered the single most important manuscript for New Testament textual criticism.

**Key facts:**
- **Date:** ~300–325 AD (slightly older than Sinaiticus)
- **Location:** Vatican Apostolic Library, Vatican City (where it has been kept since at least 1475)
- **Content:** Most of the Greek Old Testament and New Testament; some later portions are missing
- **Language:** Greek uncial script

**Why scholars prize it:**
- Its text is extremely careful and conservative, showing relatively few harmonizations or expansions
- Alongside Sinaiticus, it is the anchor of the Alexandrian text-type
- It agrees with P75 (a papyrus 100+ years older) to a remarkable degree, suggesting both descend from a very early and reliable exemplar
- Like Sinaiticus, it **omits** John 7:53–8:11 and Mark 16:9–20`,
  },
  {
    patterns: [/textual\s*criticism|what\s*is\s*textual|how\s*do\s*scholars\s*determine/i],
    answer: `**What Is Textual Criticism?**

Textual criticism is the scholarly discipline of analyzing copies of ancient documents to reconstruct the most likely original text. For the New Testament, it is the field that compares over 5,800 Greek manuscripts to determine what the apostles actually wrote.

**Core principles:**
- **External evidence:** Which manuscripts attest a reading? How old are they? What text-type are they?
- **Internal evidence:** Which reading best explains how the others arose? Scribes tended to add, not remove. Shorter, harder readings are often original.
- **Manuscript families (text-types):** Alexandrian (oldest, most accurate), Byzantine (most numerous), Western (paraphrastic)

**Key tools:**
- Critical apparatuses (Nestle-Aland 28th ed., UBS 5th ed.) list all significant variants
- Weighing "quality of manuscripts" over sheer quantity — 1 early papyrus often outweighs 100 medieval copies

**Conclusion for faith:** Textual criticism has actually *strengthened* confidence in the New Testament. The sheer number of manuscripts means variants are well-documented — and no core Christian doctrine rests on a disputed passage.`,
  },
  {
    patterns: [/how\s*many\s*manuscripts|number\s*of\s*manuscripts|5[,\s]?800|25[,\s]?000/i],
    answer: `**How Many New Testament Manuscripts Exist?**

The New Testament is the most well-attested document from the ancient world — by a wide margin.

**Greek manuscripts:** ~5,800 (ranging from tiny papyrus scraps to complete bound codices)
**Latin manuscripts:** ~10,000+
**Other languages** (Syriac, Coptic, Armenian, Gothic, Ethiopic, etc.): ~9,000–10,000
**Total:** Over 25,000 manuscript copies or fragments

**For comparison:**
- Homer's *Iliad*: ~1,800 manuscripts (the runner-up)
- Caesar's *Gallic Wars*: ~251 manuscripts
- Plato's *Tetralogies*: ~210 manuscripts

**Earliest copies:**
- **P52** — ~125 AD (fragment of John 18)
- **P66, P75** — ~175–225 AD (substantial portions of John)
- **Codex Sinaiticus** — ~360 AD (complete New Testament)

The abundance of manuscripts means that even if every Bible were destroyed, scholars could reconstruct virtually the entire New Testament from quotations in early church fathers alone (2nd–4th centuries).`,
  },
  {
    patterns: [/errors?\s*in\s*the\s*bible|contradictions?\s*in\s*the\s*bible|bible\s*reliable|is\s*the\s*bible\s*accurate/i],
    answer: `**Are There Errors in the Bible? — A Scholarly Perspective**

This is a nuanced question that textual critics approach carefully.

**What the manuscripts actually show:**
- There are approximately 400,000 textual variants across all New Testament manuscripts
- The vast majority (~99%) are trivial: spelling differences, word order variations, movable-nu changes — the kind of variation expected in hand-copied documents
- Meaningful variants (where the sense actually changes) are far fewer — scholars like Daniel Wallace estimate fewer than 1% affect anything doctrinally significant

**Famous examples of variants:**
- Mark 16:9–20 — the "Long Ending" is absent from Sinaiticus and Vaticanus
- John 7:53–8:11 — absent from earliest manuscripts
- 1 John 5:7 — the Comma Johanneum added much later

**What this means:**
- No textual variant eliminates or contradicts a core Christian doctrine
- Every major teaching of Christianity is attested in undisputed passages
- Textual criticism gives us very high confidence in what the original New Testament authors wrote

Scholars like Bart Ehrman emphasize the variants; scholars like Daniel Wallace emphasize that the variants are well-catalogued and the text is reliably recoverable. Both agree on the manuscript facts — they differ on the theological implications.`,
  },
  {
    patterns: [/1\s*john\s*5\s*:?\s*7|comma\s*johanneum|heavenly\s*witnesses/i],
    answer: `**1 John 5:7 — The Comma Johanneum**

1 John 5:7 in the KJV reads: *"For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one."* This is the most explicit Trinitarian statement in the New Testament — and almost certainly a later addition.

**Manuscript evidence:**
- The expanded text appears in **no Greek manuscript before the 10th century AD**
- It is absent from **Codex Sinaiticus, Codex Vaticanus**, and every early papyrus
- The earliest Greek manuscripts containing it date to ~1215–1520 AD, and most appear to be back-translated from Latin
- The passage is absent from all early translations (Syriac, Coptic, Armenian)
- It first appears in **Latin manuscripts** in Spain/North Africa around the 4th–6th century AD

**How it entered the KJV:** Erasmus (1516) excluded it from his first two editions of the Greek New Testament. Under pressure, he included it in his 1522 third edition after a Greek manuscript surfaced (now believed to have been manufactured specifically to force its inclusion).

**Scholarly consensus:** The Comma Johanneum is a late Latin interpolation. All modern critical editions of the Greek New Testament (NA28, UBS5) omit it. Most modern translations (ESV, NIV, NASB, CSB) do not include it.

**Note for faith:** The Trinity is taught throughout the undisputed New Testament — this passage is not needed to establish Trinitarian theology.`,
  },
  {
    patterns: [/mark\s*16\s*:?\s*9|long\s*ending\s*of\s*mark|mark.*resurrection\s*appearance/i],
    answer: `**Mark 16:9–20 — The Long Ending of Mark**

The Gospel of Mark in most modern Bibles ends at 16:8 — *"they were afraid"* — with verses 9–20 marked as a later addition.

**Manuscript evidence:**
- **Codex Sinaiticus (~360 AD):** Ends at 16:8. The scribe left a blank column — apparently aware that something was missing but unsure what to add.
- **Codex Vaticanus (~325 AD):** Also ends at 16:8, with unusual spacing suggesting the scribe knew the text was disputed.
- **P45** (3rd century papyrus): Incomplete, but the evidence is consistent with a shorter ending
- **Eusebius and Jerome** (4th century): Both noted that verses 9–20 were absent from most Greek manuscripts of their day

**When did it appear?** The Long Ending is attested in the *Diatessaron* (~170 AD) and in Irenaeus (~180 AD), suggesting it was composed in the 2nd century to provide a more satisfying resurrection narrative.

**Three endings exist in manuscripts:**
1. The Short Ending (ends at 16:8)
2. The Shorter Ending (a brief addition after 16:8, in a few manuscripts)
3. The Long Ending (verses 9–20) — the most widely copied

**Confidence:** Red — absent from the oldest and best manuscripts. Modern Bibles bracket or footnote verses 9–20.`,
  },
  {
    patterns: [/trinity|1\s*john\s*5\s*:?\s*7|trinitarian.*manuscript|manuscript.*trinity/i],
    answer: `**Manuscripts Supporting the Trinity**

The doctrine of the Trinity does not rest on any single disputed manuscript — it is distributed across many well-attested passages.

**Key undisputed Trinitarian texts:**
- **Matthew 28:19** — "baptize in the name of the Father, Son, and Holy Spirit" (universally attested)
- **John 1:1** — "the Word was God" (5,800+ manuscripts agree)
- **John 10:30** — "I and the Father are one" (no significant variants)
- **John 20:28** — Thomas calls Jesus "My Lord and my God" (universally attested)
- **2 Corinthians 13:14** — Trinitarian benediction (no significant variants)
- **Philippians 2:6** — Jesus "being in the form of God" (no significant variants)

**The disputed text (1 John 5:7 — Comma Johanneum):** This is the only verse that explicitly names all three persons of the Trinity in one sentence — and it is almost certainly a later addition (see my answer on 1 John 5:7).

**Conclusion:** The Trinity is one of the most manuscript-secure doctrines in Christianity — it does not rely on any contested passage. The removal of 1 John 5:7 from critical editions has no impact on Trinitarian theology.`,
  },
  {
    patterns: [/earliest.*matthew|matthew.*earliest|p1.*matthew|matthew.*papyrus/i],
    answer: `**Earliest Manuscripts of Matthew**

The Gospel of Matthew is attested from the early 3rd century AD.

**P1 (Papyrus 1):**
- **Date:** ~200–250 AD
- **Content:** Matthew 1:1–9, 12, 14–20 (portions of the genealogy and birth narrative)
- **Location:** University of Pennsylvania Museum, Philadelphia
- This is the earliest surviving fragment of Matthew's Gospel

**Other early Matthew manuscripts:**
- **P37** (~250–300 AD) — contains Matthew 26:19–52 (the passion narrative)
- **P45** (~250 AD) — a Chester Beatty papyrus with portions of all four Gospels, including Matthew
- **P64/67** (~150–200 AD) — fragments of Matthew 3, 5, and 26; some scholars date these very early and consider them among the oldest NT manuscripts

**Codex Sinaiticus and Vaticanus** (~325–360 AD) both contain Matthew complete.

**Note:** Unlike John (attested by P52 at ~125 AD), Matthew lacks a 2nd-century papyrus. However, the manuscript tradition is still remarkably rich and consistent.`,
  },
  {
    patterns: [/p66|papyrus\s*66|bodmer\s*ii/i],
    answer: `**P66 — The Bodmer Papyrus II**

P66 is one of the most important early manuscripts of the Gospel of John.

**Key facts:**
- **Date:** ~175 AD (possibly as early as 150 AD by some estimates)
- **Content:** Nearly complete text of John 1–14, with fragments of chapters 15–21
- **Location:** Bibliotheca Bodmeriana (Bodmer Library), Cologny, Switzerland
- **Condition:** Remarkably well-preserved for a 2nd-century papyrus — over 100 pages survive

**Significance:**
- Pushes our knowledge of John's Gospel back to within 75–125 years of composition
- Agrees closely with Codex Vaticanus in most readings, supporting the Alexandrian text-type
- Contains John 3:16 and virtually all the key verses of the Fourth Gospel
- Notable for its *corrections* — the scribe frequently corrected his own work, giving scholars insight into scribal practice

P66 and P75 (its near-contemporary) together form the earliest substantial witnesses to John and are critical anchors in New Testament textual scholarship.`,
  },
  {
    patterns: [/p75|papyrus\s*75|bodmer\s*xiv|bodmer\s*xv/i],
    answer: `**P75 — The Bodmer Papyrus XIV–XV**

P75 is paired with P66 as one of the two great early papyri of John, and is also important for Luke.

**Key facts:**
- **Date:** ~175–225 AD
- **Content:** Luke 3–24 and John 1–15 (with some gaps)
- **Location:** Vatican Apostolic Library (purchased by the Vatican from the Bodmer Library in 2007)
- **Condition:** Well-preserved, a careful copy showing a scribe working from a reliable exemplar

**Why P75 matters especially:**
- Its text of John is virtually identical to **Codex Vaticanus** (~325 AD) — even though they are separated by over 100 years
- This agreement suggests Vaticanus descends from a very early and carefully maintained manuscript tradition, boosting our confidence in Vaticanus as a reliable witness
- P75 is considered a very careful, "professional" copy with few scribal errors`,
  },
]

const FALLBACK_ANSWER = `That's a great question, but I don't have specific data on that topic in my current knowledge base.

**Here's where to look for answers:**
- **Codex Sinaiticus online:** codexsinaiticus.org — free digital access to one of the oldest complete Bibles
- **NET Bible:** netbible.org — has extensive textual notes on virtually every verse
- **Nestle-Aland 28th Edition** — the standard critical Greek New Testament, used by scholars worldwide
- **"Misquoting Jesus" by Bart Ehrman** — a readable (though skeptical) introduction to textual variants
- **"Myths and Mistakes in New Testament Textual Criticism" (Elijah Hixson & Peter Gurry)** — a scholarly rebuttal to common misunderstandings

You can also explore the manuscript data on this site by browsing verses in **John** or using the **Search** page. Each verse page shows confidence ratings and manuscript attestation.`

function getAnswer(question: string): string {
  const q = question.toLowerCase()
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.patterns.some((p) => p.test(q) || p.test(question))) {
      return entry.answer
    }
  }
  return FALLBACK_ANSWER
}

// ---------------------------------------------------------------------------
// Markdown-lite renderer — bold (**text**) and line breaks
// ---------------------------------------------------------------------------

function RichText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-1" />
        // Replace **bold** with <strong>
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="text-sm text-zinc-700 leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j} className="text-zinc-900 font-semibold">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Typing indicator
// ---------------------------------------------------------------------------

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div className="w-7 h-7 rounded-full bg-amber-700/20 border border-amber-700/30 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-3.5 h-3.5 text-amber-700" />
      </div>
      <div className="bg-zinc-100 border border-zinc-300 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber-700/60 animate-bounce"
              style={{ animationDelay: `${i * 150}ms`, animationDuration: '900ms' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Suggested question chips
// ---------------------------------------------------------------------------

const SUGGESTED_QUESTIONS = [
  'What is P52?',
  'Tell me about John 3:16',
  'What is Codex Sinaiticus?',
  'Is John 7:53–8:11 original?',
  'How many NT manuscripts exist?',
  'What is the Comma Johanneum?',
  'Is Mark 16:9–20 authentic?',
  'What is textual criticism?',
]

// ---------------------------------------------------------------------------
// Message types
// ---------------------------------------------------------------------------

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AskScholar() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasMessages = messages.length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Fake delay for realism
    await new Promise((r) => setTimeout(r, 320))

    const answer = getAnswer(trimmed)
    const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', text: answer }
    setMessages((prev) => [...prev, assistantMsg])
    setIsLoading(false)

    // Refocus input
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestion = (q: string) => {
    sendMessage(q)
  }

  const handleClear = () => {
    setMessages([])
    setInput('')
    setIsLoading(false)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ------------------------------------------------------------------ */}
      {/* Message area                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {/* Welcome state */}
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-700/10 border border-amber-700/20 flex items-center justify-center mb-5">
              <BookOpen className="w-7 h-7 text-amber-700" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">Ask Scholar</h2>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Ask anything about Bible manuscript evidence, textual criticism, papyri, or specific verses. No login
              required.
            </p>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg) =>
          msg.role === 'user' ? (
            /* User bubble — right-aligned amber */
            <div key={msg.id} className="flex justify-end mb-4">
              <div className="max-w-[80%] bg-amber-700 text-white rounded-2xl rounded-br-sm px-4 py-2.5">
                <p className="text-sm font-medium">{msg.text}</p>
              </div>
            </div>
          ) : (
            /* Assistant bubble — left-aligned zinc */
            <div key={msg.id} className="flex items-end gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-amber-700/20 border border-amber-700/30 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <div className="max-w-[85%] bg-zinc-100 border border-zinc-200 rounded-2xl rounded-bl-sm px-4 py-3">
                <RichText text={msg.text} />
                <p className="text-xs text-zinc-400 mt-3 border-t border-zinc-200 pt-2">
                  Rule-based response · Always verify with primary sources
                </p>
              </div>
            </div>
          )
        )}

        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Suggested chips — shown before first message                         */}
      {/* ------------------------------------------------------------------ */}
      {!hasMessages && (
        <div className="px-4 pb-3">
          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestion(q)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full border border-zinc-300 text-zinc-500 hover:border-amber-700/50 hover:text-amber-700 disabled:opacity-40 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Input bar                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a verse, manuscript, or concept…"
            disabled={isLoading}
            className="flex-1 rounded-xl bg-white border border-zinc-300 px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/20 disabled:opacity-50 transition-colors"
          />
          {hasMessages && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear conversation"
              className="p-2.5 rounded-xl border border-zinc-300 text-zinc-500 hover:text-zinc-700 hover:border-zinc-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-700 text-white hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Send"
          >
            {isLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin block" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
