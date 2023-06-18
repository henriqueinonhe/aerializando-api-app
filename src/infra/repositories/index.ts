import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";
import {
  TrickRepository,
  TrickTypeRepository,
} from "../../domain/tricks/TrickRepository";
import makeExerciseRepository from "./exercise-repository";
import makeTrickRepository from "./trick-repository";
import makeTrickTypeRepository from "./trick-type-repository";

export type Repositories = {
  exerciseRepository: () => ExerciseRepository;
  trickRepository: () => TrickRepository;
  trickTypeRepository: () => TrickTypeRepository;
};

const repositories: Repositories = {
  exerciseRepository: makeExerciseRepository,
  trickRepository: makeTrickRepository,
  trickTypeRepository: makeTrickTypeRepository,
};

export default repositories;
