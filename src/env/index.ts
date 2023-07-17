const appEnv = {
  jwtSecret: process.env.JWT_SECRET,
  useAuth: process.env.USE_AUTH === "true",
}

export default appEnv;