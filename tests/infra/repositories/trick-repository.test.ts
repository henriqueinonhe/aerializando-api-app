import repositories from "../../../src/infra/repositories";
import { getNewTrickType } from "../../helpers/factories/trick-type-factory";

describe("trickRepository", () => {
  describe("store", () => {
    test("stores with a new type", async () => {
      const repository = repositories.trickRepository();

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
      const repository = repositories.trickRepository();
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
      const repository = repositories.trickRepository();

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
      expect(updatedTrick.type.name).toBe("New trick type");
      expect(updatedTrick.videoLink).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      );
      expect(updatedTrick.videoThumbnail).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      );
    });

    test("updates with existent type", async () => {
      const repository = repositories.trickRepository();
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
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      );
      expect(updatedTrick.videoThumbnail).toBe(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      );
    });
  });

  describe("findAll", () => {
    test("found tricks", async () => {
      const repository = repositories.trickRepository();

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
      const repository = repositories.trickRepository();

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(0);
    });
  });

  describe("findById", () => {
    test("found trick", async () => {
      const repository = repositories.trickRepository();

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      const trickFound = await repository.findById(trick.id);

      expect(trickFound?.id).toBe(trick.id);
    });

    test("not found tricks", async () => {
      const repository = repositories.trickRepository();

      const trickFound = await repository.findById(9_999);

      expect(trickFound).toBeNull();
    });
  });

  describe("remove", async () => {
    test("removes trick", async () => {
      const repository = repositories.trickRepository();

      const trick = await repository.store({
        name: "Trick 1",
        type: await getNewTrickType(),
      });

      await repository.remove(trick.id);

      const tricks = await repository.findAll();

      expect(tricks).toHaveLength(0);
    });

    test("not found trick", async () => {
      const repository = repositories.trickRepository();

      expect(async () => {
        await repository.remove(9_999);
      }).rejects.toThrowError();
    });
  });
});
