import makeExerciseRepository from "../../../src/infra/repositories/exercise-repository";

describe("makeExerciseRepository", () => {
  test("store", async () => {
    const repository = makeExerciseRepository();

    const exercise = await repository.store({
      name: "Exercise 1",
      type: "Exercise 1 type",
    });

    expect(exercise).toStrictEqual({
      id: expect.any(Number),
      description: null,
      name: "Exercise 1",
      type: "Exercise 1 type",
      videoLink: null,
      videoThumbnail: null,
    });
  });

  test("update", async () => {
    const repository = makeExerciseRepository();

    const exercise = await repository.store({
      name: "Exercise 1",
      type: "Exercise 1 type",
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

      await repository.store({ name: "Exercise 1", type: "Exercise 1 type" });
      await repository.store({ name: "Exercise 1", type: "Exercise 1 type" });
      await repository.store({ name: "Exercise 1", type: "Exercise 1 type" });

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
        type: "Exercise 1 type",
      });

      await repository.delete(exercise.id);

      const exercises = await repository.findAll();

      expect(exercises).toHaveLength(0);
    });

    test("not found exercise", async () => {
      const repository = makeExerciseRepository();

      expect(async () => {
        await repository.delete(9_999)
      }).rejects.toThrowError();
    });
  });
});
