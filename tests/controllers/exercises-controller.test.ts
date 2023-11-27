import repositories from "../../src/infra/repositories";
import { ExerciseTypes } from "../../src/infra/schemas/exercise-schema";
import exercisesService from "../../src/infra/services/exercises-service";
import generateAccessToken from "../helpers/generate-access-token";
import request from "../helpers/test-server";

describe("Exercises", async () => {
  let accessToken: string;

  beforeEach(async () => {
    accessToken = await generateAccessToken();
  });

  describe("GET /exercises", () => {
    test("returns 200 OK with all exercises", async () => {
      const service = exercisesService(repositories.exerciseRepository());

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

      const response = await request
        .get("/exercises")
        .set("authorization", accessToken)
        .expect(200);

      expect(response.body).toHaveLength(3);
    });
  });

  describe("GET /exercises/:id", () => {
    test("returns 200 OK with exercise", async () => {
      const service = exercisesService(repositories.exerciseRepository());

      const exercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      const response = await request
        .get(`/exercises/${exercise.id}`)
        .set("authorization", accessToken)
        .expect(200);

      expect(response.body.id).toBe(exercise.id);
    });

    test("returns 404 not found", async () => {
      const response = await request
        .get("/exercises/9999")
        .set("authorization", accessToken)
        .expect(404);

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
        .set("authorization", accessToken)
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

    test("returns 500 internal server error if exercise is invalid", async () => {
      const response = await request
        .post("/exercises")
        .set("authorization", accessToken)
        .send({ type: ExerciseTypes.STRETCHING_AND_WARM_UP })
        .expect(500);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({ code: "invalid_type" }),
          ]),
          message: "VALIDATION_ERROR",
        }),
      );
    });
  });

  describe("PUT /exercises", () => {
    test("returns 200 OK with updated exercise", async () => {
      const service = exercisesService(repositories.exerciseRepository());

      const newExercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      const response = await request
        .put("/exercises")
        .set("authorization", accessToken)
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

    test("returns 500 internal server error if exercise is invalid", async () => {
      const service = exercisesService(repositories.exerciseRepository());

      const newExercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      const response = await request
        .post("/exercises")
        .set("authorization", accessToken)
        .send({
          id: newExercise.id,
          type: ExerciseTypes.STRETCHING_AND_WARM_UP,
        })
        .expect(500);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({ code: "invalid_type" }),
          ]),
          message: "VALIDATION_ERROR",
        }),
      );
    });
  });

  describe("DELETE /exercises", () => {
    test("returns 204 no content", async () => {
      const service = exercisesService(repositories.exerciseRepository());

      const exercise = await service.store({
        name: "Exercise 1",
        type: ExerciseTypes.STRETCHING_AND_WARM_UP,
      });

      await request
        .delete(`/exercises/${exercise.id}`)
        .set("authorization", accessToken)
        .expect(204);
    });

    test("returns 404 bad request", async () => {
      const response = await request
        .delete("/exercises/222222")
        .set("authorization", accessToken)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Exercise 222222 not found",
        statusCode: 404,
      });
    });
  });
});
