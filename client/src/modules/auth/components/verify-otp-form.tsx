import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useParams } from "react-router"
import { verifyOtpSchema, type VerifyOtpSchema } from "@phone-ledger/shared"
import {
  useResendOtp,
  useVerifyEmail,
  useVerifyResetPassword,
} from "@/api/auth/auth.mutation"
import { useOtpStore } from "@/store/otp.store"
import { useResendCountdown } from "@/hooks/use-resend-countdown"

const VerifyOtpForm = () => {
  const { type } = useParams()
  const verifyEmail = useVerifyEmail()
  const verifyRestPassword = useVerifyResetPassword()
  const resendOtp = useResendOtp()
  const resendAvailableAt = useOtpStore((state) => state.resendAvailableAt)
  const { secondsLeft, canResend } = useResendCountdown(resendAvailableAt)

  const form = useForm<VerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const otp = form.watch("otp")

  function onSubmit(data: VerifyOtpSchema) {
    if (type == "email-verification") {
      verifyEmail.mutate(data)
    } else {
      verifyRestPassword.mutate(data)
    }
  }

  const handleResendOtp = () => {
    const otpType =
      type === "email-verification"
        ? "verification-email"
        : "forgot-password-email"
    resendOtp.mutate({ type: otpType })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl"> Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit verification code sent to your email address.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="verify-otp-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="otp"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputOTP {...field} id={field.name} maxLength={6}>
                    <InputOTPGroup className="mx-auto *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FieldDescription className="text-center">
                    Enter the verification code sent to your email.
                  </FieldDescription>
                  <FieldError />
                </Field>
              )}
            />
            <div className="space-y-1">
              <Button
                type="submit"
                className="w-full"
                disabled={otp.length !== 6}
              >
                Verify OTP
              </Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {canResend
                    ? `Didn't receive the code?`
                    : `Resend OTP after ${secondsLeft}s`}
                </p>
                <Button
                  variant="link"
                  className="h-auto p-0"
                  type="button"
                  onClick={() => handleResendOtp()}
                  disabled={!canResend}
                >
                  Resend OTP
                </Button>
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default VerifyOtpForm
