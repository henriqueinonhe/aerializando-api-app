import makeExerciseRepository from "../../src/infra/repositories/exercise-repository";
import { ExerciseTypes } from "../../src/infra/schemas/exercise-schema";
import exercisesService from "../../src/infra/services/exercises-service";
import request from "../test-server";

describe("Exercises", async () => {
  describe("GET /exercises", () => {
    test("returns 200 OK with all exercises", async () => {
      const service = exercisesService(makeExerciseRepository());

      await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });
      await service.store({
        name: "Exercise 2",
        type: ExerciseTypes.TISSUE_CONDITIONING,
      });
      await service.store({
        name: "Exercise 3",
        type: ExerciseTypes.WARM_UP_AND_CONDITIONING,
      });

      const response = await request.get("/exercises").expect(200);

      expect(response.body).toStrictEqual([
        expect.objectContaining({
          id: expect.any(Number),
          name: "Exercise 1",
          type: ExerciseTypes.STRETCHING_AND_WARM_UP,
        }),
        expect.objectContaining({
          id: expect.any(Number),
          name: "Exercise 2",
          type: ExerciseTypes.TISSUE_CONDITIONING,
        }),
        expect.objectContaining({
          id: expect.any(Number),
          name: "Exercise 3",
          type: ExerciseTypes.WARM_UP_AND_CONDITIONING,
        }),
      ]);
    });
  });

  describe("POST /exercises", () => {
    test("returns 201 created with new exercise", async () => {
      const response = await request
        .post("/exercises")
        .send({
          name: "Exercise 1",
          type: ExerciseTypes.STRETCHING_AND_WARM_UP,
        })
        .expect(201);

      expect(response.body).toStrictEqual({
        id: expect.any(Number),
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
        description: null,
        videoLink: null,
        videoThumbnail: null,
      });
    });
  });

  describe("PUT /exercises", () => {
    test("returns 200 OK with updated exercise", async () => {
      const service = exercisesService(makeExerciseRepository());

      const newExercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      const response = await request
        .put("/exercises")
        .send({ ...newExercise, description: "run so fast" })
        .expect(200);

      expect(response.body).toStrictEqual({
        id: expect.any(Number),
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
        description: 'run so fast',
        videoLink: null,
        videoThumbnail: null,
      });
    });
  });
});
