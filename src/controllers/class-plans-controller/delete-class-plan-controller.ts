import { Repositories } from "../../infra/repositories";
import classPlansService from "../../infra/services/class-plans-service";
import { Request, Response } from "../types";

export default function deleteClassPlanController({
  classPlanRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const { id } = request.params as { id: string };
    const service = classPlansService(classPlanRepository());

    await service.remove(Number(id));

    return response.status(204).send();
  };
}
