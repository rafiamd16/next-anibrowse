import { Recommendation, RecommendationResponse } from '@/types/anime'

export const getAnimes = async <T>(resource: string, q?: string): Promise<T> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${resource}${q ? `?${q}` : ''}`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

export const getNestedAnime = async <K extends 'entry'>(
  resource: string,
  objectProperty: K
): Promise<Recommendation[K][number][]> => {
  const res = await getAnimes<RecommendationResponse>(resource)
  return res.data.flatMap((item) => item[objectProperty])
}

export function pickRandom<T>(data: T[], count: number): T[] {
  if (count >= data.length) return data

  const start = Math.floor(Math.random() * (data.length - count + 1))
  return data.slice(start, start + count)
}
