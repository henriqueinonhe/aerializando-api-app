import z from "zod";
import { TrickSchema, TrickTypeSchema } from "../../infra/schemas/trick-schema";

export type Trick = z.infer<typeof TrickSchema>;

export type TrickType = z.infer<typeof TrickTypeSchema>;
