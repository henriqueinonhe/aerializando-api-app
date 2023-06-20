import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  salt: z.string(),
  createdAt: z.date(),
});

export const createUserSchema = z
  .object({
    name: z.string().min(3, "NAME_LENGTH_MIN_3"),
    email: z.string().email("INVALID_EMAIL").min(1, "REQUIRED_EMAIL"),
    password: z.string().min(8, "PASSWORD_LENGTH_MIN_8"),
    passwordConfirmation: z.string({ required_error: "REQUIRED_PASSWORD" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "PASSWORDS_NOT_MATCH",
    path: ["passwordConfirmation"],
  });

export const loginSchema = z.object({
  email: z.string().email("INVALID_EMAIL").min(1, "REQUIRED_EMAIL"),
  password: z.string().min(8, "PASSWORD_LENGTH_MIN_8"),
});
