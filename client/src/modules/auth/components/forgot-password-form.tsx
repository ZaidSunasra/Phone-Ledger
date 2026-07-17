import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldDescription, FieldGroup, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "zs-phone-common";
import { useForgotPassword } from "@/api/auth/auth.mutation";

export function ForgotPasswordForm() {

  const forgotPassword = useForgotPassword()

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordSchema) {
    forgotPassword.mutate(data)
  }

  return (
    <form
      id="forgot-password-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <FieldGroup>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address to receive a verification code.
          </p>
        </div>
        <Controller
          control={form.control}
          name="email"
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
                id={field.name}
                type="email"
                placeholder="Enter your email"
                {...field}
              />
              <FieldDescription>
                We'll send a verification code to this email.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.email]} />
            </Field>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Send Verification Code
        </Button>
      </FieldGroup>
    </form>
  );
}