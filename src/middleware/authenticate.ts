import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { Request, Response } from "../controllers/types";

const authenticateRoutes = ["/exercises", "/tricks", "/class-plans"] as const;

const isAuthenticateRoute = (path: string) => {
  return authenticateRoutes.find((route) => path.includes(route));
};

export default function authenticate(
  fastify: FastifyInstance,
  request: Request,
  response: Response,
  next: HookHandlerDoneFunction
) {
  try {
    if (isAuthenticateRoute(request.routerPath)) {
      if (request.headers.authorization) {
        fastify.jwt.verify(request.headers.authorization);
        next();
      } else {
        return response
          .status(400)
          .send({ message: "authorization header not found" });
      }
    } else {
      next();
    }
  } catch (error: any) {
    if (error.message === "The token signature is invalid.")
      return response.status(400).send({ message: error.message });

    return response.status(401).send({ message: "Unauthorized" });
  }
}
