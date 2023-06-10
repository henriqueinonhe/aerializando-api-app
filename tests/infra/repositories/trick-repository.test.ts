import crypto from "crypto";
import makeTrickRepository from "../../../src/infra/repositories/trick-repository";
import makeTrickTypeRepository from "../../../src/infra/repositories/trick-type-repository";

describe("makeTrickRepository", () => {
  const getNewTrickType = async (name?: string) => {
    const ticketTypeRepository = makeTrickTypeRepository();

    return await ticketTypeRepository.store({
      name: name ?? `TicketType_${crypto.randomUUID()}`,
    });
  };

  describe("store", () => {
    test("stores with a new type", async () => {
      const repository = makeTrickRepository();

      const trick = await repository.store({
        name: "Trick 1",
        type: {
          name: "New Trick type",
        },
      });

      expect(trick).toStrictEqual({
        id: expect.any(Number),
        name: "Trick 1",
        description: null,
        videoLink: null,
        videoThumbnail: null,
        type: {
          id: expect.any(Number),
          name: "New Trick type",
        },
      });
    });

    test("stores with existent type", async () => {
      const repository = makeTrickRepository();
      const trickType = "Foot key";

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(trickType),
      });

      expect(trick).toStrictEqual({
        id: expect.any(Number),
        name: "Trick 1",
        description: null,
        videoLink: null,
        videoThumbnail: null,
        type: {
          id: expect.any(Number),
          name: trickType,
        },
      });
    });
  });

  describe("update", () => {
    test("updates with a new type", async () => {
      const repository = makeTrickRepository();

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const updatedTrick = await repository.update({
        ...trick,
        name: "Trick update",
        description: "run so fast",
        type: { name: "New trick type" },
        videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoThumbnail: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      });

      expect(updatedTrick.name).toBe("Trick update");
      expect(updatedTrick.description).toBe("run so fast");
      expect(updatedTrick.type.name).toBe('New trick type');
      expect(updatedTrick.videoLink).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      );
      expect(updatedTrick.videoThumbnail).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      );
    });

    test("updates with existent type", async () => {
      const repository = makeTrickRepository();
      const trickType = "Foot key 2";

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(trickType),
      });

      const updatedTrick = await repository.update({
        ...trick,
        name: "Trick update",
        description: "run so fast",
        videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoThumbnail: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      });

      expect(updatedTrick.name).toBe("Trick update");
      expect(updatedTrick.description).toBe("run so fast");
      expect(updatedTrick.type.name).toBe(trickType);
      expect(updatedTrick.videoLink).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      );
      expect(updatedTrick.videoThumbnail).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      );
    });
  });

  describe("findAll", () => {
    test("found tricks", async () => {
      const repository = makeTrickRepository();

      await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });
      await repository.store({
        name: "Trick 2",
        type: await getNewTrickType(),
      });
      await repository.store({
        name: "Trick 3",
        type: await getNewTrickType(),
      });

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(3);
    });

    test("not found tricks", async () => {
      const repository = makeTrickRepository();

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(0);
    });
  });

  describe("findById", () => {
    test("found trick", async () => {
      const repository = makeTrickRepository();

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const trickFound = await repository.findById(trick.id);

      expect(trickFound?.id).toBe(trick.id);
    });

    test("not found tricks", async () => {
      const repository = makeTrickRepository();

      const trickFound = await repository.findById(9_999);

      expect(trickFound).toBeNull();
    });
  });

  describe("delete", async () => {
    test("deletes trick", async () => {
      const repository = makeTrickRepository();

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      await repository.delete(trick.id);

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(0);
    });

    test("not found trick", async () => {
      const repository = makeTrickRepository();

      expect(async () => {
        await repository.delete(9_999);
      }).rejects.toThrowError();
    });
  });
});
