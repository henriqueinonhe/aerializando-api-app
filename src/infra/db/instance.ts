import { PrismaClient } from "@prisma/client";

const clientInstance = () => {
  if (process.env.SHOW_SQL_LOG === "true") {
    const client = new PrismaClient({
      log: [{ emit: "event", level: "query" }],
    });

    client.$on("query", ({ query, params, duration }) => {
      console.log({ query, params, duration });
    });

    return client;
  }

  return new PrismaClient({});
};

const client = clientInstance();

export default client;
