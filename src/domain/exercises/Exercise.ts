export interface Exercise {
  id: number
  type: string
  name: string
  description?: string | null
  videoLink?: string | null
  videoThumbnail?: string | null
}