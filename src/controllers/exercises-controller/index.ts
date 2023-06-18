import { FastifyInstance } from "fastify"
import createExerciseController from "./create-exercise-controller"
import fetchExercisesController from "./fetch-exercises-controller"
import updateExerciseController from "./update-exercise-controller"
import findExerciseController from "./find-exercise-controller"
import deleteExerciseController from "./delete-exercise-controller"

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/exercises', fetchExercisesController)
  fastify.get('/exercises/:id', findExerciseController)
  fastify.post('/exercises', createExerciseController)
  fastify.put('/exercises', updateExerciseController)
  fastify.delete('/exercises/:id', deleteExerciseController)
}