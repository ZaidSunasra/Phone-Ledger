import LandingPage from '@/modules/landing/pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router