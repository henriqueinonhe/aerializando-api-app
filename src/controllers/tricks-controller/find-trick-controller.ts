import { Repositories } from "../../infra/repositories";
import tricksService from "../../infra/services/tricks-service";
import { Request, Response } from "../types";

export default function findTrickController({ trickRepository }: Repositories) {
  return async (request: Request, response: Response) => {
    const { id } = request.params;
    const service = tricksService(trickRepository());

    const trick = await service.findById(Number(id));

    return response.status(200).send(trick);
  };
}
