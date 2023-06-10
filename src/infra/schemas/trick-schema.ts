import z from "zod";

export const TrickTypeSchema = z
  .object({
    id: z.number().nullish(),
    name: z.string(),
  })
  .strict();

export const TrickSchema = z
  .object({
    id: z.number(),
    type: TrickTypeSchema,
    name: z.string(),
    description: z.string().nullish(),
    videoLink: z.string().nullish(),
    videoThumbnail: z.string().nullish(),
  })
  .strict();

export const CreateTrickSchema = TrickSchema.omit({ id: true }).extend({
  type: TrickTypeSchema.omit({ id: true }),
});
