import z from "zod";

export const RegisterValidator = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm: z.string(),
    code: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type UserCreationRequest = z.infer<typeof RegisterValidator>;

export const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserSigninRequest = z.infer<typeof SignInValidator>;
