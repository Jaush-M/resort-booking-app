import z from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6, {
    error: "Password should be longer than 6 characters.",
  }),
  rememberMe: z.boolean().optional(),
});
