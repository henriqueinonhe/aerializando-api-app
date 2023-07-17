import {
  InvalidUserPasswordError,
  UserEmailNotRegisteredError,
} from "../../../src/errors/custom-errors";
import repositories from "../../../src/infra/repositories";
import authService from "../../../src/infra/services/auth-service";
import userService from "../../../src/infra/services/users-service";

describe("authService", () => {
  describe("login", () => {
    describe("when user is logged successfully", () => {
      test("returns new access token", async () => {
        const user = {
          name: "John Doe",
          email: "j@j.com",
          password: "123456",
          passwordConfirmation: "123456",
        };
        const userRepository = repositories.userRepository();

        await userService(userRepository).store(user);

        const service = authService(userRepository);

        const accessToken = await service.login(
          user.email,
          user.password,
          () => "new token"
        );

        expect(accessToken).toBe("new token");
      });
    });

    describe("when user email does not exist", () => {
      test("throws UserEmailNotRegisteredError exception", async () => {
        const service = authService(repositories.userRepository());

        expect(async () => {
          await service.login("j@j.com", "123456", () => "new token");
        }).rejects.toThrowError(UserEmailNotRegisteredError);
      });
    });

    describe("when user password is incorrect", () => {
      test("throws InvalidUserPasswordError exception", async () => {
        const user = {
          name: "John Doe",
          email: "j@j.com",
          password: "123456",
          passwordConfirmation: "123456",
        };
        await userService(repositories.userRepository()).store(user);

        const service = authService(repositories.userRepository());

        expect(async () => {
          await service.login(
            user.email,
            "invalid_password",
            () => "new token"
          );
        }).rejects.toThrowError(InvalidUserPasswordError);
      });
    });
  });

  describe("logout", () => {
    test("stores user revoked access token", async () => {
      const user = {
        name: "John Doe",
        email: "j@j.com",
        password: "123456",
        passwordConfirmation: "123456",
      };
      const userRepository = repositories.userRepository();

      await userService(userRepository).store(user);

      const service = authService(userRepository);

      await service.logout("tokenId", user.email);

      const userNotLogged = await userRepository.findByEmail(user.email);

      expect(userNotLogged?.revokedAccessTokenIds?.length).toBe(1);
      expect(userNotLogged?.revokedAccessTokenIds?.[0]).toBe("tokenId");
    });

    describe("when user email does not exist", () => {
      test("throws UserEmailNotRegisteredError exception", async () => {
        const service = authService(repositories.userRepository());

        expect(async () => {
          await service.logout("tokenId", "j@j.com");
        }).rejects.toThrowError(UserEmailNotRegisteredError);
      });
    });
  });
});
