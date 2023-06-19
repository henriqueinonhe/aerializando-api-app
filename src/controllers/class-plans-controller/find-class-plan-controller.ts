import { Repositories } from "../../infra/repositories";
import classPlansService from "../../infra/services/class-plans-service";
import { Request, Response } from "../types";

export default function findClassPlanController({
  classPlanRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const { id } = request.params;
    const service = classPlansService(classPlanRepository());

    const classPlan = await service.findById(Number(id));

    return response.status(200).send(classPlan);
  };
}
