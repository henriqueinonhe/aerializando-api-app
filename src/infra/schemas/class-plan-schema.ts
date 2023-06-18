import z from "zod";
import { TrickSchema } from "./trick-schema";
import { ExerciseSchema } from "./exercise-schema";

export const FocusTypes = {
  FORCE_CORE: "FORCE_CORE",
  GRIP_STRENGTH: "GRIP_STRENGTH",
  CURVE_STRENGTH: "CURVE_STRENGTH",
  AMBIDEXTERITY: "AMBIDEXTERITY",
  GENERAL_FLEXIBILITY: "GENERAL_FLEXIBILITY",
  SPINAL_FLEXIBILITY: "SPINAL_FLEXIBILITY",
  SPLITS_FLEXIBILITY: "SPLITS_FLEXIBILITY",
  PULL_UP_STRENGTH: "PULL_UP_STRENGTH",
  LOWER_BODY_STRENGTH: "LOWER_BODY_STRENGTH",
  COMPENSATORY_TRAINING_CROSS_TRAINING: "COMPENSATORY_TRAINING_CROSS_TRAINING",
  TOE_POINT: "TOE_POINT",
  POSTURAL_TECHNIQUE: "POSTURAL_TECHNIQUE",
} as const;

export const ClassPlanSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    classNumber: z.string(),
    focusType1: z.nativeEnum(FocusTypes),
    focusType2: z.nativeEnum(FocusTypes),
    tricks: z.array(TrickSchema),
    exerciseBlocs: z.array(
      z.object({
        id: z.number().optional(),
        exercises: z.array(ExerciseSchema),
      })
    ),
  })
  .strict();
