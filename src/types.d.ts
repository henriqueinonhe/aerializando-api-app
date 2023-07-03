import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      name: string;
      email: string;
      createdAt: string;
      iat: number;
    };
  }
}
