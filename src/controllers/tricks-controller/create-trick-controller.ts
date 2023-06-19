import { Repositories } from "../../infra/repositories";
import { createTrickSchema } from "../../infra/schemas/trick-schema";
import tricksService from "../../infra/services/tricks-service";
import { Request, Response } from "../types";

export default function createTrickController({
  trickRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const input = createTrickSchema.parse(request.body);

    const service = tricksService(trickRepository());
    const newTrick = await service.store(input);

    return response.status(201).send(newTrick);
  };
}
