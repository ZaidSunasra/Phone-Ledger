import { BrowserRouter, Routes, Route } from 'react-router'
import { lazy } from 'react'
import LoginPage from '@/modules/auth/pages/login-page'
import SignupPage from '@/modules/auth/pages/signup-page'
import LandingPage from '@/modules/landing/pages/landing-page'
const VerifyOtpPage = lazy(() => import('@/modules/auth/pages/verify-otp-page'))
const ForgotPasswordPage = lazy(() => import('@/modules/auth/pages/forgot-password-page'))
const ResetPasswordPage = lazy(() => import('@/modules/auth/pages/reset-password-page'))

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/verify-otp/:type' element={<VerifyOtpPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router