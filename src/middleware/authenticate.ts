import { FastifyJWT, JWT } from "@fastify/jwt";
import { Request, Response } from "../controllers/types";
import { Repositories } from "../infra/repositories";

type UserJWT = FastifyJWT["user"] | null;

const authenticateRoutes = [
  "exercises",
  "tricks",
  "class-plans",
  "logout",
] as const;

const isAuthenticateRoute = (path: string) => {
  if (!path) return false;

  return authenticateRoutes.find((route) => path.includes(route));
};

const unauthorizedResponse = (response: Response) => {
  return response.status(401).send({ message: "Unauthorized" });
};

export default async function authenticate(
  jwt: JWT,
  { userRepository }: Repositories,
  request: Request,
  response: Response
) {
  try {
    if (!isAuthenticateRoute(request.routerPath)) return;

    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(400).send({
        message: "Authorization header not found",
      });
    }

    const userJWT = jwt.decode(authorization) as UserJWT;

    if (!userJWT) return unauthorizedResponse(response);

    const user = await userRepository().findByEmail(userJWT.email);

    if (!user) return unauthorizedResponse(response);

    const { revokedAccessTokens } = user;

    const isUserNotLogged = revokedAccessTokens?.includes(authorization);

    if (isUserNotLogged) return unauthorizedResponse(response);

    jwt.verify(authorization);
  } catch (error: any) {
    if (error.message === "The token signature is invalid.")
      return response.status(400).send({ message: error.message });

    return unauthorizedResponse(response);
  }
}
