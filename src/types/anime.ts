interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

export interface Anime {
  mal_id: number
  images: {
    jpg: {
      image_url: string | null
      small_image_url: string | null
      large_image_url: string | null
    }
    webp: {
      image_url: string | null
      small_image_url: string | null
      large_image_url: string | null
    }
  }
  trailer: {
    youtube_id: string | null
    url: string | null
    embed_url: string | null
  }
  approved: boolean
  titles: {
    type: string
    title: string
  }[]
  title: string
  type: string | null | 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music'
  source: string | null
  episodes: number | null
  status: string | null | 'Finished Airing' | 'Currently Airing' | 'Not yet aired'
  airing: boolean
  aired: {
    from: string | null
    to: string | null
    prop: {
      from: {
        day: number | null
        month: number | null
        year: number | null
      }
      to: {
        day: number | null
        month: number | null
        year: number | null
      }
      string: string | null
    }
  }
  duration: string | null
  rating:
    | string
    | null
    | 'G - All Ages'
    | 'PG - Children'
    | 'PG-13 - Teens 13 or older'
    | 'R - 17+ (violence & profanity)'
    | 'R+ - Mild Nudity'
    | 'Rx - Hentai'
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  season: string | null | 'summer' | 'winter' | 'spring' | 'fall'
  year: number | null
  broadcast: {
    day: string | null
    time: string | null
    timezone: string | null
    string: string | null
  }
  producers: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
  licensors: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
  studios: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
  genres: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
  explicit_genres: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
  themes: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
  demographics: {
    mal_id: number
    type: string
    name: string
    url: string
  }[]
}

export interface ListResponse<T> {
  data: T[]
  pagination: Pagination
}

export interface DetailResponse<T> {
  data: T
}

export interface Recommendation {
  mal_id: number
  entry: Anime[]
  content: string
  user: {
    url: string
    username: string
  }
}

export type AnimeListResponse = ListResponse<Anime>
export type AnimeDetailResponse = DetailResponse<Anime>
export type RecommendationResponse = ListResponse<Recommendation>
