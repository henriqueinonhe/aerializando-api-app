import makeExerciseRepository from "../../../src/infra/repositories/exercise-repository";
import { ExerciseTypes } from "../../../src/infra/schemas/exercise-schema";

describe("makeExerciseRepository", () => {
  test("store", async () => {
    const repository = makeExerciseRepository();

    const exercise = await repository.store({
      name: "Exercise 1",
      type: ExerciseTypes.STRETCHING_AND_WARM_UP,
    });

    expect(exercise).toStrictEqual({
      id: expect.any(Number),
      description: null,
      name: "Exercise 1",
      type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      videoLink: null,
      videoThumbnail: null,
    });
  });

  test("update", async () => {
    const repository = makeExerciseRepository();

    const exercise = await repository.store({
      name: "Exercise 1",
      type: ExerciseTypes.STRETCHING_AND_WARM_UP,
    });

    const updatedUser = await repository.update({
      ...exercise,
      name: "Jane Doe",
      description: "run so fast",
      videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoThumbnail: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });

    expect(updatedUser.description).toBe("run so fast");
    expect(updatedUser.videoLink).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    expect(updatedUser.videoThumbnail).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
  });

  describe("findAll", () => {
    test("found exercise", async () => {
      const repository = makeExerciseRepository();

      await repository.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });
      await repository.store({
        name: "Exercise 2",
        type: ExerciseTypes.TISSUE_CONDITIONING,
      });
      await repository.store({
        name: "Exercise 3",
        type: ExerciseTypes.WARM_UP_AND_CONDITIONING,
      });

      const exercises = await repository.findAll();

      expect(exercises).toHaveLength(3);
    });

    test("not found exercises", async () => {
      const repository = makeExerciseRepository();

      const exercises = await repository.findAll();

      expect(exercises).toHaveLength(0);
    });
  });

  describe("delete", async () => {
    test("deletes exercise", async () => {
      const repository = makeExerciseRepository();

      const exercise = await repository.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      await repository.delete(exercise.id);

      const exercises = await repository.findAll();

      expect(exercises).toHaveLength(0);
    });

    test("not found exercise", async () => {
      const repository = makeExerciseRepository();

      expect(async () => {
        await repository.delete(9_999);
      }).rejects.toThrowError();
    });
  });
});
