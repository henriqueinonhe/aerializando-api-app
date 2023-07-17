import { FastifyInstance } from "fastify";
import client from "../../infra/db/instance";
import { Request, Response } from "../types";
import docs from "./docs";

const isDBLive = async () => {
  try {
    await client.$queryRaw`SELECT * FROM pg_tables WHERE schemaname='public'`;
    return "live";
  } catch (error) {
    return "dead";
  }
};

const healthController = async (_: Request, response: Response) => {
  const status = {
    db: await isDBLive(),
    version: "1.0.0",
  };

  return response.status(200).send(status);
};

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/health", docs.health, healthController);
}
