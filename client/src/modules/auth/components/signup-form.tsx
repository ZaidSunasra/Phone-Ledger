import { useSignup } from "@/api/auth/auth.mutation"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { NavLink } from "react-router"
import { signupSchema, type SignupSchema } from "zs-phone-common"

export function SignupForm() {

    const signup = useSignup();

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    const handleSubmit = (data: SignupSchema) => {
        signup.mutate(data)
    }

    return (
        <form
            id="signup-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
        >
            <FieldGroup>
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Fill in the form below to create your account
                    </p>
                </div>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel
                                htmlFor={field.name}
                            >
                                Name*
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="John Doe"
                                autoComplete="on"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
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
                                Email*
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="johndoe@example.com"
                                autoComplete="on"
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
                            <FieldLabel
                                htmlFor={field.name}
                            >
                                Password*
                            </FieldLabel>
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
                            disabled={signup.isPending}
                        >
                            Create Account
                        </Button>
                    </Field>
                    <FieldDescription className="text-center">
                        Already have an account?{" "}
                        <NavLink
                            to="/login"
                            className="font-bold underline underline-offset-4"
                        >
                            Sign in
                        </NavLink>
                    </FieldDescription>
                </div>
            </FieldGroup>
        </form>
    )
}
