import request from "../helpers/test-server";

test("with a running server", async () => {
  const response = await request.get("/health").expect(200);

  expect(response.body).toStrictEqual({
    db: "live",
    version: "1.0.0",
  });
});
