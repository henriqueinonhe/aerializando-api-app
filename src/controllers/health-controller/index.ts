import client from "../../infra/db/instance";
import { Request, Response } from "../types";

const isDBLive = async () => {
  try {
    await client.$queryRaw`SELECT * FROM pg_tables WHERE schemaname='public'`;
    return 'live';
  } catch (error) {
    return 'dead';
  }
};

const healthController = async (_: Request, response: Response) => {
  const status = {
    db: await isDBLive(),
    version: "1.0.0",
  };

  return response.status(200).send(status);
};

export default healthController;
