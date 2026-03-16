import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <p className="text-5xl font-bold text-amber-700 mb-4">404</p>
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Verse Not Found</h1>
      <p className="text-zinc-500 mb-8 max-w-sm">
        That reference doesn&apos;t exist — either the chapter or verse number is out of range.
      </p>
      <div className="flex gap-4">
        <Link href="/john" className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors">
          Browse John
        </Link>
        <Link href="/" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400 transition-colors">
          Home
        </Link>
      </div>
    </div>
  )
}
