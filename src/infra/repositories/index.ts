import makeClassPlanRepository from "./class-plan-repository";
import makeExerciseRepository from "./exercise-repository";
import makeTrickRepository from "./trick-repository";
import makeTrickTypeRepository from "./trick-type-repository";
import makeUserRepository from "./user-repository";

const repositories = {
  classPlanRepository: makeClassPlanRepository,
  exerciseRepository: makeExerciseRepository,
  trickRepository: makeTrickRepository,
  trickTypeRepository: makeTrickTypeRepository,
  userRepository: makeUserRepository,
};

export type Repositories = typeof repositories;

export default repositories;
