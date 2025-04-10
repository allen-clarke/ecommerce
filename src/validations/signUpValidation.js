import { z } from "zod";
const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default signUpSchema;
