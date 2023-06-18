import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository";
import { TrickRepository } from "../../domain/tricks/TrickRepository";
import makeExerciseRepository from "./exercise-repository";
import makeTrickRepository from "./trick-repository";

export type Repositories = {
  exerciseRepository: () => ExerciseRepository;
  trickRepository: () => TrickRepository;
};

const repositories: Repositories = {
  exerciseRepository: makeExerciseRepository,
  trickRepository: makeTrickRepository,
};

export default repositories;
