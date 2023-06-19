import { Repositories } from "../../infra/repositories";
import { createClassPlanSchema } from "../../infra/schemas/class-plan-schema";
import classPlansService from "../../infra/services/class-plans-service";
import { Request, Response } from "../types";

export default function createClassPlanController({
  classPlanRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const input = createClassPlanSchema.parse(request.body);

    const service = classPlansService(classPlanRepository());
    const newClassPlan = await service.store(input);

    return response.status(201).send(newClassPlan);
  };
}
