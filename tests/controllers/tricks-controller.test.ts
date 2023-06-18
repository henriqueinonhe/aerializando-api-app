import tricksService from "../../src/infra/services/tricks-service";
import { getNewTrickType } from "../helpers/factories/trick-type-factory";
import request from "../helpers/test-server";

describe("Tricks", async () => {
  describe("GET /tricks", () => {
    test("returns 200 OK with all tricks", async () => {
      const service = tricksService();

      await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });
      await service.store({
        name: "Trick 2",
        type: await getNewTrickType(),
      });
      await service.store({
        name: "Trick 3",
        type: await getNewTrickType(),
      });

      const response = await request.get("/tricks").expect(200);

      expect(response.body).toHaveLength(3);
    });
  });

  describe("GET /tricks/:id", () => {
    test("returns 200 OK with trick", async () => {
      const service = tricksService();

      const trick = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const response = await request.get(`/tricks/${trick.id}`).expect(200);

      expect(response.body.id).toBe(trick.id);
    });

    test("returns 404 not found", async () => {
      const response = await request.get("/tricks/9999").expect(404);

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

    test("returns 400 bad request if trick is invalid", async () => {
      const response = await request
        .post("/tricks")
        .send({ type: await getNewTrickType() })
        .expect(400);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          error: "Bad Request",
          message: expect.stringContaining("invalid_type"),
        })
      );
    });
  });

  describe("PUT /tricks", () => {
    test("returns 200 OK with updated trick", async () => {
      const service = tricksService();

      const newExercise = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const response = await request
        .put("/tricks")
        .send({ ...newExercise, description: "run so fast" })
        .expect(200);

      expect(response.body).toStrictEqual({
        id: expect.any(Number),
        name: "Trick 1",
        type: {
          id: expect.any(Number),
          name: expect.any(String),
        },
        description: "run so fast",
        videoLink: null,
        videoThumbnail: null,
      });
    });

    test("returns 400 bad request if trick is invalid", async () => {
      const service = tricksService();

      const newExercise = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const response = await request
        .post("/tricks")
        .send({
          id: newExercise.id,
          type: await getNewTrickType(),
        })
        .expect(400);

      expect(response.body).toStrictEqual(
        expect.objectContaining({
          error: "Bad Request",
          message: expect.stringContaining("invalid_type"),
        })
      );
    });
  });

  describe("DELETE /tricks", () => {
    test("returns 204 no content", async () => {
      const service = tricksService();

      const trick = await service.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      await request.delete(`/tricks/${trick.id}`).expect(204);
    });

    test("returns 404 bad request", async () => {
      const response = await request.delete("/tricks/222222").expect(404);

      expect(response.body).toStrictEqual({
        error: "Not Found",
        message: "Trick 222222 not found",
        statusCode: 404,
      });
    });
  });
});
