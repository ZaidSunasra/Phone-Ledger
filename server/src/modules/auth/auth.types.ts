import z from "zod/v4";

export const signupSchema = z.object({
    name: z.string(),
    email: z.email("Not a valid email"),
    password: z.string().min(6, "Password should be greater than 6 characters")
});

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;