import crypto from "crypto";
import makeTrickTypeRepository from "../../../src/infra/repositories/trick-type-repository";

describe("makeTrickTypeRepository", () => {
  describe("store", async () => {
    test("creates trick type", async () => {
      const repository = makeTrickTypeRepository();

      const trick = await repository.store({
        name: `Foot key ${crypto.randomUUID()}`,
      });

      expect(trick).toStrictEqual({
        id: expect.any(Number),
        name: trick.name,
      });
    });

    test("throws if trick type already exists", async () => {
      const repository = makeTrickTypeRepository();

      const trick = await repository.store({ name: `Foot key ${crypto.randomUUID()}` });

      await expect(
        repository.store({ name: trick.name })
      ).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    test("found tricks", async () => {
      const repository = makeTrickTypeRepository();

      await repository.store({ name: `Foot key ${crypto.randomUUID()}` });
      await repository.store({ name: `Foot key ${crypto.randomUUID()}` });
      await repository.store({ name: `Foot key ${crypto.randomUUID()}` });

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(3);
    });

    test("not found tricks", async () => {
      const repository = makeTrickTypeRepository();

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(0);
    });
  });
});
