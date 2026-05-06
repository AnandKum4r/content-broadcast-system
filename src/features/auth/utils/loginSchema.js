// src/features/auth/utils/loginSchema.js
import { z } from "zod";

/*
  Login form validation schema
*/

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});