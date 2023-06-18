import { Exercise } from "../../../src/domain/exercises/Exercise";
import makeClassPlanRepository from "../../../src/infra/repositories/class-plan-repository";
import makeExerciseRepository from "../../../src/infra/repositories/exercise-repository";
import { FocusTypes } from "../../../src/infra/schemas/class-plan-schema";
import { ExerciseTypes } from "../../../src/infra/schemas/exercise-schema";
import makeTrickRepository from "../../../src/infra/repositories/trick-repository";
import { Trick } from "../../../src/domain/tricks/Trick";

describe("makeClassPlanRepository", () => {
  const getExercises = async (): Promise<Exercise[]> => {
    const repository = makeExerciseRepository();

    return [
      await repository.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      }),
      await repository.store({
        name: "Exercise 2",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      }),
    ];
  };

  const getTricks = async (): Promise<Trick[]> => {
    const repository = makeTrickRepository();

    return [
      await repository.store({
        name: "Trick 1",
        type: {
          name: "New Trick type 1",
        },
      }),
      await repository.store({
        name: "Trick 2",
        type: {
          name: "New Trick type 2",
        },
      }),
    ];
  };

  test("store", async () => {
    const repository = makeClassPlanRepository();

    const classPlan = await repository.store({
      name: "Plan 1",
      focusType1: FocusTypes.AMBIDEXTERITY,
      focusType2: FocusTypes.GENERAL_FLEXIBILITY,
      classNumber: "1",
      tricks: await getTricks(),
      exerciseBlocs: [{ exercises: await getExercises() }],
    });

    expect(classPlan.name).toBe("Plan 1");
    expect(classPlan.tricks).toHaveLength(2);
    expect(classPlan.exerciseBlocs).toHaveLength(1);
    expect(classPlan.exerciseBlocs[0].exercises).toHaveLength(2);
  });

  test("update", async () => {
    const repository = makeClassPlanRepository();

    const classPlan = await repository.store({
      name: "Plan 1",
      focusType1: FocusTypes.AMBIDEXTERITY,
      focusType2: FocusTypes.GENERAL_FLEXIBILITY,
      classNumber: "1",
      tricks: await getTricks(),
      exerciseBlocs: [{ exercises: await getExercises() }],
    });

    const updatedClassPlan = await repository.update({
      id: classPlan.id,
      name: "Plan 2",
      classNumber: "1",
      tricks: [classPlan.tricks[0]],
      exerciseBlocs: [
        {
          id: classPlan.exerciseBlocs[0].id,
          exercises: [classPlan.exerciseBlocs[0].exercises[0]],
        },
        { exercises: classPlan.exerciseBlocs[0].exercises },
      ],
    });

    expect(updatedClassPlan.name).toBe("Plan 2");
    expect(updatedClassPlan.tricks).toHaveLength(1);
    expect(updatedClassPlan.exerciseBlocs).toHaveLength(2);
    expect(updatedClassPlan.exerciseBlocs[0].exercises).toHaveLength(1);
    expect(updatedClassPlan.exerciseBlocs[1].exercises).toHaveLength(2);
  });
});
