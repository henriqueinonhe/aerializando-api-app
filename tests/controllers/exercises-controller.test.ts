import makeExerciseRepository from "../../src/infra/repositories/exercise-repository";
import { ExerciseTypes } from "../../src/infra/schemas/exercise-schema";
import exercisesService from "../../src/infra/services/exercises-service";
import request from "../helpers/test-server";

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

      expect(response.body).toHaveLength(3);
    });
  });

  describe("GET /exercises/:id", () => {
    test("returns 200 OK with exercise", async () => {
      const service = exercisesService(makeExerciseRepository());

      const exercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      const response = await request
        .get(`/exercises/${exercise.id}`)
        .expect(200);

      expect(response.body.id).toBe(exercise.id);
    });

    test("returns 404 not found", async () => {
      const response = await request.get("/exercises/9999").expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Exercise 9999 not found",
        statusCode: 404,
      });
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
        description: "run so fast",
        videoLink: null,
        videoThumbnail: null,
      });
    });
  });

  describe("DELETE /exercises", () => {
    test("returns 204 no content", async () => {
      const service = exercisesService(makeExerciseRepository());

      const exercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      await request.delete(`/exercises/${exercise.id}`).expect(204);
    });

    test("returns 404 bad request", async () => {
      const response = await request.delete("/exercises/222222").expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Exercise 222222 not found",
        statusCode: 404,
      });
    });
  });
});
