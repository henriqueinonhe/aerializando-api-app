import { Repositories } from "../../infra/repositories";
import { trickSchema } from "../../infra/schemas/trick-schema";
import tricksService from "../../infra/services/tricks-service";
import { Request, Response } from "../types";

export default function updateTrickController({
  trickRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const input = trickSchema.parse(request.body);

    const service = tricksService(trickRepository());
    const updatedTrick = await service.update(input);

    return response.status(200).send(updatedTrick);
  };
}
