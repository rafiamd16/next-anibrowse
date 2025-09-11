import AnimeList from '@/components/anime-list'
import Header from '@/components/anime-list/header'
import PaginationTemplate from '@/components/utilities/pagination'
import { getAnimes } from '@/lib/api/anime'
import { AnimeListResponse } from '@/types/anime'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Search Anime',
}

interface Props {
  params: Promise<{
    keyword: string
  }>
  searchParams: Promise<{
    page: string
  }>
}

const SearchPage = async ({ params, searchParams }: Props) => {
  const { keyword } = await params
  const pageParam = await searchParams
  const page = pageParam.page ? parseInt(pageParam.page as string) : 1

  const decodedQuery = decodeURIComponent(keyword).trim().toLowerCase()

  if (isNaN(page) || page < 1) redirect(`/search/${decodedQuery}?page=1`)

  const searchAnime = await getAnimes<AnimeListResponse>('anime', `q=${decodedQuery}&page=${page}`)

  if (!searchAnime || !searchAnime.data || searchAnime.data.length === 0) return notFound()

  const { last_visible_page } = searchAnime.pagination
  if (page > last_visible_page) redirect(`/search/${decodedQuery}?page=${last_visible_page}`)

  return (
    <section className="container mx-auto pt-18 sm:pt-20">
      <Header title={`Search for ${decodedQuery}...`} />
      <AnimeList animes={searchAnime.data} />

      <div className="mt-8 flex justify-center">
        <PaginationTemplate
          currentPage={page}
          totalPages={last_visible_page}
          baseUrl={`/search/${decodedQuery}`}
        />
      </div>
    </section>
  )
}

export default SearchPage
