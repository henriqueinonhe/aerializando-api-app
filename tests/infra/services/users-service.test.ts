import { UserEmailAlreadyExistsError } from "../../../src/errors/custom-errors";
import repositories from "../../../src/infra/repositories";
import userService from "../../../src/infra/services/users-service";

describe("usersService", () => {
  describe("store", () => {
    describe("when user is registered successfully", () => {
      test("persists the user", async () => {
        const service = userService(repositories.userRepository());

        await service.store({
          name: "John Doe",
          email: "j@j.com",
          password: "123456",
          passwordConfirmation: "123456",
        });

        expect(await service.findByEmail("j@j.com")).toStrictEqual({
          id: expect.any(Number),
          name: "John Doe",
          email: "j@j.com",
          password: expect.any(String),
          salt: expect.any(String),
          createdAt: expect.any(Date),
          revokedAccessTokenIds: [],
        });
      });
    });

    describe("when user is already registered", () => {
      test("throws UserEmailAlreadyExistsError exception", async () => {
        const user = {
          name: "John Doe",
          email: "j@j.com",
          password: "123456",
          passwordConfirmation: "123456",
        };

        const service = userService(repositories.userRepository());

        await service.store(user);

        expect(async () => {
          await service.store(user);
        }).rejects.toThrowError(UserEmailAlreadyExistsError);
      });
    });
  });
});
