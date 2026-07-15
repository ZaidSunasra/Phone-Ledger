import { CTA } from "../components/cta"
import { Features } from "../components/feature"
import { Footer } from "../components/footer"
import { Hero } from "../components/hero"
import { Navbar } from "../components/navbar"
import { Pricing } from "../components/pricing"

const LandingPage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA/>
      <Footer />
    </div>
  )
}

export default LandingPage