import crypto from "crypto";
import repositories from "../../../src/infra/repositories";

describe("trickTypeRepository", () => {
  describe("store", async () => {
    test("creates trick type", async () => {
      const repository = repositories.trickTypeRepository();

      const trick = await repository.store({
        name: `Foot key ${crypto.randomUUID()}`,
      });

      expect(trick).toStrictEqual({
        id: expect.any(Number),
        name: trick.name,
      });
    });

    test("throws if trick type already exists", async () => {
      const repository = repositories.trickTypeRepository();

      const trick = await repository.store({
        name: `Foot key ${crypto.randomUUID()}`,
      });

      await expect(
        repository.store({ name: trick.name }),
      ).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    test("found tricks", async () => {
      const repository = repositories.trickTypeRepository();

      await repository.store({ name: `Foot key ${crypto.randomUUID()}` });
      await repository.store({ name: `Foot key ${crypto.randomUUID()}` });
      await repository.store({ name: `Foot key ${crypto.randomUUID()}` });

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(3);
    });

    test("not found tricks", async () => {
      const repository = repositories.trickTypeRepository();

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(0);
    });
  });
});
