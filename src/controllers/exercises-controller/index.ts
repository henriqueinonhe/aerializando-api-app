import { FastifyInstance } from "fastify"
import createExerciseController from "./create-exercise-controller"
import listAllExercisesController from "./list-all-exercices-controller"
import updateExerciseController from "./update-exercise-controller"

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/exercises', listAllExercisesController)
  fastify.post('/exercises', createExerciseController)
  fastify.put('/exercises', updateExerciseController)
}