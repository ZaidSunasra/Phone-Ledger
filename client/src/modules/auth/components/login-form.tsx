import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NavLink } from "react-router"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginSchema } from "zs-phone-common"
import { useLogin } from "@/api/auth/auth.mutation"

export function LoginForm() {

    const login = useLogin()

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = (data: LoginSchema) => {
        login.mutate(data)
    }

    return (
        <form
            id="login-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
        >
            <FieldGroup>
                <div className="space-y-1text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel
                                htmlFor={field.name}
                            >
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="johndoe@example.com"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <div className="flex items-center justify-between">
                                <FieldLabel
                                    htmlFor={field.name}
                                >
                                    Password
                                </FieldLabel>
                                <NavLink
                                    to="/forgot-password"
                                    className="text-xs font-medium text-primary hover:underline underline-offset-4"
                                >
                                    Forgot password?
                                </NavLink>
                            </div>
                            <Input
                                {...field}
                                id={field.name}
                                type="password"
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                                placeholder="******"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <div className="space-y-2">
                    <Field>
                        <Button
                            type="submit"
                            disabled={login.isPending}
                        >
                            Login
                        </Button>
                    </Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <NavLink
                            to="/signup"
                            className="font-bold underline underline-offset-4"
                        >
                            Sign up
                        </NavLink>
                    </FieldDescription>
                </div>
            </FieldGroup>
        </form>
    )
}
