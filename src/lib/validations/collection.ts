import { z } from 'zod'

export const createCollectionFormSchema = z.object({
  animeTitle: z.string().trim(),
  animeImage: z.string().trim(),
})

export type CreateCollectionFormSchema = z.infer<typeof createCollectionFormSchema>
