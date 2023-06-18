import z from "zod";
import { classPlanSchema } from "../../infra/schemas/class-plan-schema";

export type ClassPlan = z.infer<typeof classPlanSchema>;
