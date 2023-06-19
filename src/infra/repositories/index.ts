import { ClassPlanRepository } from "../../domain/class-plans/ClassPlanRepository";
import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";
import {
  TrickRepository,
  TrickTypeRepository,
} from "../../domain/tricks/TrickRepository";
import { UserRepository } from "../../domain/users/UserRepository";
import makeClassPlanRepository from "./class-plan-repository";
import makeExerciseRepository from "./exercise-repository";
import makeTrickRepository from "./trick-repository";
import makeTrickTypeRepository from "./trick-type-repository";
import makeUserRepository from "./user-repository";

export type Repositories = {
  classPlanRepository: () => ClassPlanRepository;
  exerciseRepository: () => ExerciseRepository;
  trickRepository: () => TrickRepository;
  trickTypeRepository: () => TrickTypeRepository;
  userRepository: () => UserRepository;
};

const repositories: Repositories = {
  classPlanRepository: makeClassPlanRepository,
  exerciseRepository: makeExerciseRepository,
  trickRepository: makeTrickRepository,
  trickTypeRepository: makeTrickTypeRepository,
  userRepository: makeUserRepository,
};

export default repositories;
