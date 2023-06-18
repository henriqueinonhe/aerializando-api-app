import { FastifyReply, FastifyRequest } from "fastify";

export type Request = FastifyRequest<{ Params: { id: string } }>;
export type Response = FastifyReply;
