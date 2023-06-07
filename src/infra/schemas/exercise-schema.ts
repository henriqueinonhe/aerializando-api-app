import z from 'zod'

export const ExerciseTypes = {
  STRETCHING_AND_WARM_UP: 'STRETCHING_AND_WARM_UP',
  WARM_UP_AND_CONDITIONING: 'WARM_UP_AND_CONDITIONING',
  TISSUE_CONDITIONING: 'TISSUE_CONDITIONING',
} as const

export const ExerciseSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(ExerciseTypes),
  name: z.string(),
  description: z.string().optional().nullish(),
  videoLink: z.string().optional().nullish(),
  videoThumbnail: z.string().optional().nullish(),
}).strict()

export const CreateExerciseSchema = ExerciseSchema.omit({ id: true })