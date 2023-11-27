import { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import {
  InvalidUserPasswordError,
  NotFoundError,
  UserEmailAlreadyExistsError,
  UserEmailNotRegisteredError,
} from "./custom-errors";

export default function errorsHandler(
  log: FastifyBaseLogger,
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    log.error(error);
    reply.status(500).send({
      message: "VALIDATION_ERROR",
      error: JSON.parse(error.message),
    });
  } else if (error instanceof NotFoundError) {
    log.error(error);
    reply.status(404).send(error);
  } else if (error instanceof UserEmailNotRegisteredError) {
    log.error(error);
    reply.status(400).send({ message: "USER_NOT_REGISTERED" });
  } else if (error instanceof InvalidUserPasswordError) {
    log.error(error);
    reply.status(400).send({ message: "INVALID_USER_CREDENTIALS" });
  } else if (error instanceof UserEmailAlreadyExistsError) {
    log.error(error);
    reply.status(400).send({ message: "EMAIL_ALREADY_EXISTS" });
  } else {
    log.error(error);
    reply.status(500).send({ message: "Internal server error" });
  }
}
