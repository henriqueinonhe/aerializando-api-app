import { Trick } from "../../../src/domain/tricks/Trick";
import repositories from "../../../src/infra/repositories";
import { getNewTrickType } from "./trick-type-factory";

export const getTricks = async (): Promise<Trick[]> => {
  const repository = repositories.trickRepository();

  return [
    await repository.store({
      name: "Trick 1",
      type: await getNewTrickType(),
    }),
    await repository.store({
      name: "Trick 2",
      type: await getNewTrickType(),
    }),
  ];
};
