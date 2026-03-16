import AskScholar from '@/components/AskScholar'
import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ask Scholar — OpenScripture',
  description:
    'Ask questions about Bible manuscript evidence, textual criticism, and the history of the New Testament text.',
}

export default function AskPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Header */}
      <div className="mb-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-700/10 border border-amber-700/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Ask Scholar</h1>
          <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
            Get instant answers about Bible manuscript evidence, papyri, textual variants, and the history of the New
            Testament text. No login required.
          </p>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 min-h-0 rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col">
        <AskScholar />
      </div>

      {/* Footer note */}
      <p className="text-xs text-zinc-400 text-center mt-3">
        Responses are rule-based and drawn from established manuscript scholarship. Always verify with primary sources.
      </p>
    </div>
  )
}
