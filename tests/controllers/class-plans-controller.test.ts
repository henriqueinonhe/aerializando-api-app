import repositories from "../../src/infra/repositories";
import { FocusTypes } from "../../src/infra/schemas/class-plan-schema";
import classPlansService from "../../src/infra/services/class-plans-service";
import { getExercises } from "../helpers/factories/exercises-factory";
import { getTricks } from "../helpers/factories/tricks-factory";
import request from "../helpers/test-server";

describe("ClassPlans", async () => {
  describe("GET /class-plans", () => {
    test("returns 200 OK with all exercises", async () => {
      const service = classPlansService(repositories.classPlanRepository());

      await service.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });
      await service.store({
        name: "Plan 2",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });
      await service.store({
        name: "Plan 3",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      const response = await request.get("/class-plans").expect(200);

      expect(response.body).toHaveLength(3);
    });
  });

  describe("GET /class-plans/:id", () => {
    test("returns 200 OK with class plan", async () => {
      const service = classPlansService(repositories.classPlanRepository());

      const classPlan = await service.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      const response = await request
        .get(`/class-plans/${classPlan.id}`)
        .expect(200);

      expect(response.body.id).toBe(classPlan.id);
    });

    test("returns 404 not found", async () => {
      const response = await request.get("/class-plans/9999").expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Class Plan 9999 not found",
        statusCode: 404,
      });
    });
  });

  describe("POST /class-plans", () => {
    test("returns 201 created with new class plan", async () => {
      const response = await request
        .post("/class-plans")
        .send({
          name: "Plan 1",
          focusType1: FocusTypes.AMBIDEXTERITY,
          focusType2: FocusTypes.GENERAL_FLEXIBILITY,
          classNumber: "1",
          tricks: await getTricks(),
          exerciseBlocs: [{ exercises: await getExercises() }],
        })
        .expect(201);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: "Plan 1",
          classNumber: "1",
          focusType1: FocusTypes.AMBIDEXTERITY,
          focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        })
      );
    });

    test("returns 500 internal server error if class plan is invalid", async () => {
      const response = await request
        .post("/class-plans")
        .send({
          name: "Plan 1",
          focusType1: FocusTypes.AMBIDEXTERITY,
          focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        })
        .expect(500);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({ code: "invalid_type" }),
          ]),
          message: "VALIDATION_ERROR",
        })
      );
    });
  });

  describe("PUT /class-plans", () => {
    test("returns 200 OK with updated class plan", async () => {
      const service = classPlansService(repositories.classPlanRepository());

      const newClassPlan = await service.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      console.log(newClassPlan.exerciseBlocs[0]);

      const response = await request
        .put("/class-plans")
        .send({
          id: newClassPlan.id,
          name: "Plan 2",
          focusType1: FocusTypes.AMBIDEXTERITY,
          focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        })
        .expect(200);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: "Plan 2",
          classNumber: "1",
          focusType1: FocusTypes.AMBIDEXTERITY,
          focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        })
      );
    });

    test("returns 500 internal server error if class plan is invalid", async () => {
      const service = classPlansService(repositories.classPlanRepository());

      const newClassPlan = await service.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      const response = await request
        .post("/class-plans")
        .send({
          id: newClassPlan.id,
          name: "Plan 1",
          focusType1: FocusTypes.AMBIDEXTERITY,
          focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        })
        .expect(500);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({ code: "invalid_type" }),
          ]),
          message: "VALIDATION_ERROR",
        })
      );
    });
  });

  describe("DELETE /class-plans", () => {
    test("returns 204 no content", async () => {
      const service = classPlansService(repositories.classPlanRepository());

      const classPlan = await service.store({
        name: "Plan 1",
        focusType1: FocusTypes.AMBIDEXTERITY,
        focusType2: FocusTypes.GENERAL_FLEXIBILITY,
        classNumber: "1",
        tricks: await getTricks(),
        exerciseBlocs: [{ exercises: await getExercises() }],
      });

      await request.delete(`/class-plans/${classPlan.id}`).expect(204);
    });

    test("returns 404 bad request", async () => {
      const response = await request.delete("/class-plans/222222").expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Class Plan 222222 not found",
        statusCode: 404,
      });
    });
  });
});
