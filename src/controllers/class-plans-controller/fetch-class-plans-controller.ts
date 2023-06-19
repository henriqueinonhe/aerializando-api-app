import { Repositories } from "../../infra/repositories";
import classPlansService from "../../infra/services/class-plans-service";
import { Request, Response } from "../types";

export default function fetchClassPlansController({
  classPlanRepository,
}: Repositories) {
  return async (_: Request, response: Response) => {
    const service = classPlansService(classPlanRepository());

    const classPlans = await service.findAll();

    return response.status(200).send(classPlans);
  };
}
