import z, { TypeOf } from "zod/v4";

export const signupSchema = z.object({
    name: z.string(),
    email: z.email("Not a valid email"),
    password: z.string().min(6, "Password should be greater than 6 characters")
});

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});

export const forgotPasswordSchema = z.object({
   email: z.email("Not a valid email")
})

export const verifyOtpSchema = z.object({
    otp: z.string()
})

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password should be greater than 6 characters"),
    confirmPassword: z.string().min(6, "Password should be greater than 6 characters")
}).refine((data) => !(data.password && data.confirmPassword) || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})


export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
export type resetPasswordSchema = z.infer<typeof resetPasswordSchema>;