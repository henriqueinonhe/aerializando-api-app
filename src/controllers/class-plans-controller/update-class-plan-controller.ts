import { Repositories } from "../../infra/repositories";
import { updateClassPlanSchema } from "../../infra/schemas/class-plan-schema";
import classPlansService from "../../infra/services/class-plans-service";
import { Request, Response } from "../types";

export default function updateClassPlanController({
  classPlanRepository,
}: Repositories) {
  return async (request: Request, response: Response) => {
    const input = updateClassPlanSchema.parse(request.body);

    const service = classPlansService(classPlanRepository());
    const updatedClassPlan = await service.update(input);

    return response.status(200).send(updatedClassPlan);
  };
}
