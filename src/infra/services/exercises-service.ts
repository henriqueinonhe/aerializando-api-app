import { Exercise } from "../../domain/exercises/Exercise"
import { ExerciseRepository } from "../../domain/exercises/ExerciseRepository"

const exercisesService = (repository: ExerciseRepository) => ({
  store: async (exercise: Exercise) => {
    
  }
})

export default exercisesService