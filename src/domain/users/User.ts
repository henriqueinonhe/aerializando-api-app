import z from "zod";
import {
  createUserSchema,
  loginSchema,
  userSchema,
} from "../../infra/schemas/user-schema";

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type UpdateUser = Partial<CreateUser> & { id: number };

export type LoginSchema = z.infer<typeof loginSchema>;
