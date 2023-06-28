import repositories from "../../src/infra/repositories";
import userService from "../../src/infra/services/users-service";
import request from "../helpers/test-server";

const JWT_REGEX = /eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/g;

describe("User", async () => {
  describe("POST /user/register", () => {
    test("returns 201 created", async () => {
      const payload = {
        name: "John Doe",
        email: "j@j.com",
        password: "12345678",
        passwordConfirmation: "12345678",
      };
      const response = await request
        .post("/user/register")
        .send(payload)
        .expect(201);

      expect(response.body).toStrictEqual({
        message: `User ${payload.name} created`,
      });
    });

    describe("when payload is invalid", () => {
      describe('when "email" is missing', () => {
        test("returns 500 internal server error, validation error", async () => {
          const payload = {
            name: "John Doe",
            password: "12345678",
            passwordConfirmation: "12345678",
          };
          const response = await request
            .post("/user/register")
            .send(payload)
            .expect(500);

          expect(response.body).toStrictEqual({
            message: "VALIDATION_ERROR",
            error: expect.arrayContaining([
              expect.objectContaining({
                code: "invalid_type",
                message: "Required",
                path: ["email"],
              }),
            ]),
          });
        });
      });

      describe('when "name" is missing', () => {
        test("returns 500 internal server error, validation error", async () => {
          const payload = {
            email: "j@j.com",
            password: "12345678",
            passwordConfirmation: "12345678",
          };
          const response = await request
            .post("/user/register")
            .send(payload)
            .expect(500);

          expect(response.body).toStrictEqual({
            message: "VALIDATION_ERROR",
            error: expect.arrayContaining([
              expect.objectContaining({
                code: "invalid_type",
                message: "Required",
                path: ["name"],
              }),
            ]),
          });
        });
      });

      describe('when "password" is missing', () => {
        test("returns 500 internal server error, validation error", async () => {
          const payload = {
            name: "John Doe",
            email: "j@j.com",
            passwordConfirmation: "12345678",
          };
          const response = await request
            .post("/user/register")
            .send(payload)
            .expect(500);

          expect(response.body).toStrictEqual({
            message: "VALIDATION_ERROR",
            error: expect.arrayContaining([
              expect.objectContaining({
                code: "invalid_type",
                message: "Required",
                path: ["password"],
              }),
            ]),
          });
        });
      });

      describe('when "passwordConfirmation" is missing', () => {
        test("returns 500 internal server error, validation error", async () => {
          const payload = {
            name: "John Doe",
            email: "j@j.com",
            password: "12345678",
          };
          const response = await request
            .post("/user/register")
            .send(payload)
            .expect(500);

          expect(response.body).toStrictEqual({
            message: "VALIDATION_ERROR",
            error: expect.arrayContaining([
              expect.objectContaining({
                code: "invalid_type",
                message: "REQUIRED_PASSWORD",
                path: ["passwordConfirmation"],
              }),
            ]),
          });
        });
      });

      describe('when "password" length is less than 8', () => {
        test("returns 500 internal server error, validation error", async () => {
          const payload = {
            name: "John Doe",
            email: "j@j.com",
            password: "123",
            passwordConfirmation: "123",
          };
          const response = await request
            .post("/user/register")
            .send(payload)
            .expect(500);

          expect(response.body).toStrictEqual({
            message: "VALIDATION_ERROR",
            error: expect.arrayContaining([
              expect.objectContaining({
                code: "too_small",
                message: "PASSWORD_LENGTH_MIN_8",
                path: ["password"],
              }),
            ]),
          });
        });
      });

      describe("when passwords does not matches", () => {
        test("returns 500 internal server error, validation error", async () => {
          const payload = {
            name: "John Doe",
            email: "j@j.com",
            password: "123456789",
            passwordConfirmation: "987654321",
          };
          const response = await request
            .post("/user/register")
            .send(payload)
            .expect(500);

          expect(response.body).toStrictEqual({
            message: "VALIDATION_ERROR",
            error: expect.arrayContaining([
              expect.objectContaining({
                code: "custom",
                message: "PASSWORDS_NOT_MATCH",
                path: ["passwordConfirmation"],
              }),
            ]),
          });
        });
      });
    });

    describe("when user already exists", () => {
      test("throws UserEmailAlreadyExistsError exception", async () => {
        const user = {
          name: "John Doe",
          email: "j@j.com",
          password: "12345678",
          passwordConfirmation: "12345678",
        };

        const service = userService(repositories.userRepository());

        await service.store(user);

        const response = await request
          .post("/user/register")
          .send(user)
          .expect(400);

        expect(response.body).toStrictEqual({
          message: "EMAIL_ALREADY_EXISTS",
        });
      });
    });
  });

  describe("POST /user/login", () => {
    test("returns 200 OK with access token", async () => {
      const payload = {
        name: "John Doe",
        email: "j@j.com",
        password: "12345678",
        passwordConfirmation: "12345678",
      };
      const service = userService(repositories.userRepository());

      await service.store(payload);

      const { email, password } = payload;

      const response = await request
        .post("/user/login")
        .send({ email, password })
        .expect(200);

      expect(response.body).toStrictEqual({
        accessToken: expect.stringMatching(JWT_REGEX),
      });
    });
  });

  describe("POST /user/logout", () => {
    test("returns 200 OK", async () => {
      const payload = {
        name: "John Doe",
        email: "j@j.com",
        password: "12345678",
        passwordConfirmation: "12345678",
      };

      const userRepository = repositories.userRepository();
      const service = userService(userRepository);

      await service.store(payload);

      const { email, password } = payload;

      const response = await request
        .post("/user/login")
        .send({ email, password });

      await request
        .post("/user/logout")
        .set("authorization", response.body.accessToken)
        .expect(200);

      const userNotLogged = await service.findByEmail(payload.email);

      expect(userNotLogged?.revokedAccessTokens?.length).toBe(1);
    });
  });
});
