import z from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, {
    error: "Password should be longer than 6 characters.",
  }),
  rememberMe: z.boolean().optional(),
});
