import { BrowserRouter, Routes, Route } from "react-router"
import { lazy } from "react"
import LoginPage from "@/modules/auth/pages/login-page"
import SignupPage from "@/modules/auth/pages/signup-page"
import LandingPage from "@/modules/landing/pages/landing-page"
const SelectShop = lazy(() => import("@/modules/shop/pages/select-shop"))
const CreateShop = lazy(() => import("@/modules/shop/pages/create-shop"))
const VerifyOtpPage = lazy(() => import("@/modules/auth/pages/verify-otp-page"))
const SelectPlanPage = lazy(() => import("@/modules/payment/pages/select-plan"))
const DashboardPage = lazy(
  () => import("@/modules/dashboard/pages/dashboard-page")
)
const PaymentFailedPage = lazy(
  () => import("@/modules/payment/pages/payment-failed")
)
const ResetPasswordPage = lazy(
  () => import("@/modules/auth/pages/reset-password-page")
)
const ForgotPasswordPage = lazy(
  () => import("@/modules/auth/pages/forgot-password-page")
)

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp/:type" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/select-shop" element={<SelectShop />} />
        <Route path="/add-shop" element={<CreateShop />} />
        <Route path="/upgrade-plan" element={<SelectPlanPage />} />
        <Route path="/payment-failed" element={<PaymentFailedPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
