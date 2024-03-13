import { Repositories } from "../../infra/repositories";
import tricksService from "../../infra/services/tricks-service";
import { Request, Response } from "../types";

export default function fetchTricksController({
  trickRepository,
}: Repositories) {
  return async (_: Request, response: Response) => {
    const service = tricksService(trickRepository());

    const tricks = await service.findAll();

    return response.status(200).send(JSON.stringify(tricks));
  };
}
