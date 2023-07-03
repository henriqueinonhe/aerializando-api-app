import { FastifyReply, FastifyRequest } from "fastify";

export type Request<Headers = {}> = FastifyRequest<{
  Params: { id: string };
  Headers: Headers;
}>;
export type Response = FastifyReply;
