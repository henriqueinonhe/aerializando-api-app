import repositories from "../../src/infra/repositories";
import tricksService from "../../src/infra/services/tricks-service";
import { getNewTrickType } from "../helpers/factories/trick-type-factory";
import generateAccessToken from "../helpers/generate-access-token";
import request from "../helpers/test-server";

describe("Tricks", async () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await generateAccessToken();
  });

  describe("GET /tricks", () => {
    test("returns 200 OK with all tricks", async () => {
      const service = tricksService(repositories.trickRepository());

      await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });
      await service.store({
        name: "Trick 2",
        type: { name: "New Type 2" },
      });
      await service.store({
        name: "Trick 3",
        type: await getNewTrickType(),
      });

      const response = await request
        .get("/tricks")
        .set("authorization", accessToken)
        .expect(200);

      expect(response.body).toHaveLength(3);
    });
  });

  describe("GET /tricks/:id", () => {
    test("returns 200 OK with trick", async () => {
      const service = tricksService(repositories.trickRepository());

      const trick = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const response = await request
        .get(`/tricks/${trick.id}`)
        .set("authorization", accessToken)
        .expect(200);

      expect(response.body.id).toBe(trick.id);
    });

    test("returns 404 not found", async () => {
      const response = await request
        .get("/tricks/9999")
        .set("authorization", accessToken)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Trick 9999 not found",
        statusCode: 404,
      });
    });
  });

  describe("POST /tricks", () => {
    test("returns 201 created with new trick", async () => {
      const response = await request
        .post("/tricks")
        .set("authorization", accessToken)
        .send({
          name: "Trick 1",
          type: await getNewTrickType(),
        })
        .expect(201);

      expect(response.body).toStrictEqual({
        id: expect.any(Number),
        name: "Trick 1",
        type: {
          id: expect.any(Number),
          name: expect.any(String),
        },
        description: null,
        videoLink: null,
        videoThumbnail: null,
      });
    });

    test("returns 500 internal server error if trick is invalid", async () => {
      const response = await request
        .post("/tricks")
        .set("authorization", accessToken)
        .send({ type: await getNewTrickType() })
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

  describe("PUT /tricks", () => {
    test("returns 200 OK with updated trick", async () => {
      const service = tricksService(repositories.trickRepository());

      const newExercise = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const response = await request
        .put("/tricks")
        .set("authorization", accessToken)
        .send({
          ...newExercise,
          type: { name: "New Type" },
          description: "run so fast",
        })
        .expect(200);

      expect(response.body).toStrictEqual({
        id: expect.any(Number),
        name: "Trick 1",
        type: {
          id: expect.any(Number),
          name: "New Type",
        },
        description: "run so fast",
        videoLink: null,
        videoThumbnail: null,
      });
    });

    test("returns 500 internal server error if trick is invalid", async () => {
      const service = tricksService(repositories.trickRepository());

      const newExercise = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const response = await request
        .post("/tricks")
        .set("authorization", accessToken)
        .send({
          id: newExercise.id,
          type: await getNewTrickType(),
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

  describe("DELETE /tricks", () => {
    test("returns 204 no content", async () => {
      const service = tricksService(repositories.trickRepository());

      const trick = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      await request
        .delete(`/tricks/${trick.id}`)
        .set("authorization", accessToken)
        .expect(204);
    });

    test("returns 404 bad request", async () => {
      const response = await request
        .delete("/tricks/222222")
        .set("authorization", accessToken)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Trick 222222 not found",
        statusCode: 404,
      });
    });
  });
});
