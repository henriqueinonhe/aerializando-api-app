import z from "zod";
import { trickSchema } from "./trick-schema";
import { exerciseSchema } from "./exercise-schema";

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

export const classPlanSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    classNumber: z.string(),
    focusType1: z.nativeEnum(FocusTypes),
    focusType2: z.nativeEnum(FocusTypes),
    tricks: z.array(trickSchema),
    exerciseBlocs: z.array(
      z.object({
        id: z.number().optional(),
        exercises: z.array(exerciseSchema),
      })
    ),
  })
  .strict();
