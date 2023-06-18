import z from "zod";

export const trickTypeSchema = z
  .object({
    id: z.number().nullish(),
    name: z.string(),
  })
  .strict();

export const trickSchema = z
  .object({
    id: z.number(),
    type: trickTypeSchema,
    name: z.string(),
    description: z.string().nullish(),
    videoLink: z.string().nullish(),
    videoThumbnail: z.string().nullish(),
  })
  .strict();
