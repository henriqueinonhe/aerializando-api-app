import z from "zod";
import { trickSchema, trickTypeSchema } from "../../infra/schemas/trick-schema";

export type Trick = z.infer<typeof trickSchema>;

export type TrickType = z.infer<typeof trickTypeSchema>;
