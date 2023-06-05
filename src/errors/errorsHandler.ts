import { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod"

export default function errorsHandler(log: FastifyBaseLogger, error: Error, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    log.error(error)
    reply.status(400).send(error)
  } else {
    log.error(error)
    reply.status(500).send({ message: 'Internal server error' })
  }
}