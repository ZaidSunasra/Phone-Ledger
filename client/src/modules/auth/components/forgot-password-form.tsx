import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "zs-phone-common"
import { useForgotPassword } from "@/api/auth/auth.mutation"

const ForgotPasswordForm = () => {
  const forgotPassword = useForgotPassword()

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: ForgotPasswordSchema) {
    forgotPassword.mutate(data)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl"> Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address to receive a verification code.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="forgot-password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
            <Button type="submit" className="w-full">
              Send Verification Code
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default ForgotPasswordForm
