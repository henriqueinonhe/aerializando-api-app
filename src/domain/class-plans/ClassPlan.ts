import z from "zod";
import { ClassPlanSchema } from "../../infra/schemas/class-plan-schema";

export type ClassPlan = z.infer<typeof ClassPlanSchema>;
