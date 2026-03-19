import { notFound } from 'next/navigation'
import { getChapterData, getVersesByChapter } from '@/lib/data'
import { getChapterManuscript } from '@/lib/manuscripts'
import { ChapterReaderLayout } from '@/components/ChapterReaderLayout'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ chapter: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter } = await params
  const chapterNum = parseInt(chapter)
  const data = getChapterData(chapterNum)
  if (!data) return { title: 'Chapter Not Found' }
  return {
    title: `John Chapter ${chapterNum}`,
    description: data.summary,
  }
}

export default async function ChapterPage({ params }: Props) {
  const { chapter } = await params
  const chapterNum = parseInt(chapter)

  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 21) {
    notFound()
  }

  const chapterData = getChapterData(chapterNum)
  if (!chapterData) notFound()

  const keyVerses = getVersesByChapter(chapterNum)
  const allVerseNums = Array.from({ length: chapterData.verse_count }, (_, i) => i + 1)
  const manuscript = getChapterManuscript('John', chapterNum)

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <ChapterReaderLayout
        chapterNum={chapterNum}
        totalChapters={21}
        chapterData={chapterData}
        keyVerses={keyVerses}
        allVerseNums={allVerseNums}
        manuscript={manuscript}
        book="John"
      />
    </div>
  )
}
