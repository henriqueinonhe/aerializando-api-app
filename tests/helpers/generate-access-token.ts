import repositories from "../../src/infra/repositories";
import userService from "../../src/infra/services/users-service";
import request from "../helpers/test-server";

const generateAccessToken = async () => {
  const payload = {
    name: "John Doe",
    email: "auth.user@j.com",
    password: "12345678",
    passwordConfirmation: "12345678",
  };
  const service = userService(repositories.userRepository());

  await service.store(payload);

  const { email, password } = payload;

  const response = await request
    .post("/user/login")
    .send({ email, password })
    .expect(200);

  return response.body.accessToken;
};

export default generateAccessToken;
