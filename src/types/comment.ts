import { User } from '@/types/user'

export interface Comment {
  id: string
  mal_id: number
  userId: string
  animeTitle: string
  comment: string
  user?: User
  createdAt: Date
  updatedAt: Date
}
