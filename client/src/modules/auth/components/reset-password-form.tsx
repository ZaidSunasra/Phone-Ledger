import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, type ResetPasswordSchema } from "zs-phone-common";
import { useResetPassword } from "@/api/auth/auth.mutation";

export function ResetPasswordForm() {

  const resetPassword = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordSchema) {
    resetPassword.mutate(data)
  }

  return (
    <form
      id="reset-password-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <FieldGroup>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create New Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a strong password for your account.
          </p>
        </div>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}
            >
              <FieldLabel
                htmlFor={field.name}
              >
                New Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <FieldError errors={[form.formState.errors.password]} />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}
            >
              <FieldLabel
                htmlFor={field.name}
              >
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <FieldError
                errors={[form.formState.errors.confirmPassword]}
              />
            </Field>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Reset Password
        </Button>
      </FieldGroup>
    </form>
  );
}