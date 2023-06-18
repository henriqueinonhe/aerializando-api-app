import { Repositories } from "../../infra/repositories";
import tricksService from "../../infra/services/tricks-service";
import { Request, Response } from "../types";

export default function deleteTrickController({
  trickRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const { id } = request.params;
    const service = tricksService(trickRepository());

    await service.remove(Number(id));

    return response.status(204).send();
  };
}
