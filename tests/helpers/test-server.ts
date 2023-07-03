import supertest from "supertest";
import build from "../../src/app";

const start = () => {
  const app = build();

  app.listen({ port: 0 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });

  return supertest(app.server);
};

const request = start();

export default request;
