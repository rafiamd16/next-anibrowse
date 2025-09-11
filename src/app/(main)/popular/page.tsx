import AnimeList from '@/components/anime-list'
import Header from '@/components/utilities/header-menu'
import PaginationTemplate from '@/components/utilities/pagination'
import { getAnimes } from '@/lib/api/anime'
import { AnimeListResponse } from '@/types/anime'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Most Popular',
}

interface Props {
  searchParams: Promise<{
    page: string
  }>
}

const PopularPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const page = params.page ? parseInt(params.page as string) : 1

  if (isNaN(page) || page < 1) {
    redirect('/popular?page=1')
  }

  const topAnime = await getAnimes<AnimeListResponse>('top/anime', `page=${page}`)

  if (!topAnime || !topAnime.data || topAnime.data.length === 0) {
    notFound()
  }

  const { last_visible_page } = topAnime.pagination
  if (page > last_visible_page) {
    redirect(`/popular?page=${last_visible_page}`)
  }

  return (
    <section className="container mx-auto pt-18 sm:pt-20">
      <Header title={`Most Popular Anime #${page}`} />
      <AnimeList animes={topAnime.data} />

      <div className="mt-8 flex justify-center">
        <PaginationTemplate currentPage={page} totalPages={last_visible_page} baseUrl="/popular" />
      </div>
    </section>
  )
}

export default PopularPage
