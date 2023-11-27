import z from "zod";
import { exerciseSchema } from "../../infra/schemas/exercise-schema";

export type Exercise = z.infer<typeof exerciseSchema>;
