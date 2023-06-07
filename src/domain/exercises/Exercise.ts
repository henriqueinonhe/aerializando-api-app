import z from "zod";
import { ExerciseSchema } from "../../infra/schemas/exercise-schema";

export type Exercise = z.infer<typeof ExerciseSchema>;