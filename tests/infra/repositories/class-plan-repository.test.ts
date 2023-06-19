import repositories from "../../../src/infra/repositories";
import { FocusTypes } from "../../../src/infra/schemas/class-plan-schema";
import { getExercises } from "../../helpers/factories/exercises-factory";
import { getTricks } from "../../helpers/factories/tricks-factory";

describe("classPlanRepository", () => {
  test("store", async () => {
    const repository = repositories.classPlanRepository();

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
    const repository = repositories.classPlanRepository();

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

  describe("findAll", () => {
    test("found class plans", async () => {
      const repository = repositories.classPlanRepository();

      await repository.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      await repository.store({
        name: "Plan 2",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "2",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      await repository.store({
        name: "Plan 3",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "3",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      const classPlans = await repository.findAll();

      expect(classPlans).toHaveLength(3);
    });

    test("not found class plans", async () => {
      const repository = repositories.classPlanRepository();

      const classPlans = await repository.findAll();

      expect(classPlans).toHaveLength(0);
    });
  });

  describe("findById", () => {
    test("found class plan", async () => {
      const repository = repositories.classPlanRepository();

      const classPlan = await repository.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      const classPlanFound = await repository.findById(classPlan.id);

      expect(classPlanFound?.id).toBe(classPlan.id);
    });

    test("not found exercises", async () => {
      const repository = repositories.classPlanRepository();

      const classPlanFound = await repository.findById(9_999);

      expect(classPlanFound).toBeNull();
    });
  });

  describe("remove", async () => {
    test("removes class plan", async () => {
      const repository = repositories.classPlanRepository();

      const classPlan = await repository.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      await repository.remove(classPlan.id);

      const exercises = await repository.findAll();

      expect(exercises).toHaveLength(0);
    });

    test("not found class plan", async () => {
      const repository = repositories.classPlanRepository();

      expect(async () => {
        await repository.remove(9_999);
      }).rejects.toThrowError();
    });
  });
});
