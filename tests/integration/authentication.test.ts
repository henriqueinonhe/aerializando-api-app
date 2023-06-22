import generateAccessToken from "../helpers/generate-access-token";
import request from "../helpers/test-server";

describe("authentication route", () => {
  describe("when is not a route that requires authentication", () => {
    test("returns 200 OK", async () => {
      const response = await request.get("/health");

      expect(response.status).toBe(200);
    });
  });

  describe("when is a route that requires authentication contains a valid authorization header", () => {
    test("returns 200 OK", async () => {
      const accessToken = await generateAccessToken();
      const response = await request
        .get("/exercises")
        .set("authorization", accessToken);

      expect(response.status).toBe(200);
    });
  });

  describe("when is a route that requires authentication does not contain the authorization header", () => {
    test("returns 400 Bad Request", async () => {
      const response = await request.get("/exercises");

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        message: "Authorization header not found",
      });
    });
  });

  describe("when is a route that requires authentication contains a authorization header without JWT token", () => {
    test("returns 401 Unauthorized", async () => {
      const response = await request
        .get("/exercises")
        .set("authorization", "invalid-token");

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual({ message: "Unauthorized" });
    });
  });

  describe("when is a route that requires authentication contains a invalid authorization header", () => {
    test("returns 400 Bad Request", async () => {
      const accessToken = await generateAccessToken();
      const response = await request
        .get("/exercises")
        .set("authorization", `${accessToken}f`);

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        message: "The token signature is invalid.",
      });
    });
  });
});
