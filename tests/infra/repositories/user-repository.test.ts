import repositories from "../../../src/infra/repositories";

describe("userRepository", () => {
  test("store", async () => {
    const repository = repositories.userRepository();

    const user = await repository.store({
      name: "John Doe",
      email: "j@j.com",
      password: "123456",
      salt: "salt",
    });

    expect(user).toStrictEqual({
      id: expect.any(Number),
      name: "John Doe",
      email: "j@j.com",
      createdAt: expect.any(Date),
    });
  });

  test("update", async () => {
    const repository = repositories.userRepository();

    const user = await repository.store({
      name: "John Doe",
      email: "j@j.com",
      password: "123456",
      salt: "salt",
    });

    const updatedUser = await repository.update({
      ...user,
      name: "Jane Doe",
      email: "j@ja.com",
    });

    expect(updatedUser.name).toBe("Jane Doe");
    expect(updatedUser.email).toBe("j@ja.com");
  });

  describe("findByEmail", () => {
    test("found user", async () => {
      const repository = repositories.userRepository();

      const user = await repository.store({
        name: "John Doe",
        email: "j@j.com",
        password: "123456",
        salt: "salt",
      });

      const foundUser = await repository.findByEmail("j@j.com");

      expect(foundUser?.email).toBe(user.email);
    });

    test("not found user", async () => {
      const repository = repositories.userRepository();

      const foundUser = await repository.findByEmail("j@j.com");

      expect(foundUser).toBeNull();
    });
  });

  describe("storeRevokedAccessToken", () => {
    test("stores user revoked access token", async () => {
      const repository = repositories.userRepository();

      const user = await repository.store({
        name: "John Doe",
        email: "j@j.com",
        password: "123456",
        salt: "salt",
      });

      await repository.storeRevokedAccessToken("token", user.id);

      const foundUser = await repository.findByEmail("j@j.com");

      expect(foundUser?.revokedAccessTokens?.length).toBe(1);
      expect(foundUser?.revokedAccessTokens?.[0]).toBe("token");
    });
  });
});
