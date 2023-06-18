import z from 'zod'

export const ExerciseTypes = {
  STRETCHING_AND_WARM_UP: 'STRETCHING_AND_WARM_UP',
  WARM_UP_AND_CONDITIONING: 'WARM_UP_AND_CONDITIONING',
  TISSUE_CONDITIONING: 'TISSUE_CONDITIONING',
} as const

export const exerciseSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(ExerciseTypes),
  name: z.string(),
  description: z.string().nullish(),
  videoLink: z.string().nullish(),
  videoThumbnail: z.string().nullish(),
}).strict()

export const createExerciseSchema = exerciseSchema.omit({ id: true })