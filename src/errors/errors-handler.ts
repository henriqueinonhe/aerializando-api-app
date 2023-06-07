import { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { NotFoundError } from "./custom-errors";

export default function errorsHandler(
  log: FastifyBaseLogger,
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    log.error(error);
    reply.status(400).send(error);
  } else if (error instanceof NotFoundError) {
    log.error(error);
    reply.status(404).send(error);
  } else {
    log.error(error);
    reply.status(500).send({ message: "Internal server error" });
  }
}
