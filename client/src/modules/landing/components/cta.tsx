import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export function CTA() {
  const navigate = useNavigate()

  return (
    <section className="bg-blue-600 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
            Ready to Simplify Your Mobile Shop?
          </h2>
          <p className="text-lg text-balance text-blue-100">
            Join hundreds of retailers managing their business with confidence.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="bg-white px-8 py-4 font-semibold text-blue-600 hover:bg-gray-50"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            variant="outline"
            className="border-white px-8 py-4 font-semibold text-white hover:bg-blue-500"
          >
            Login
          </Button>
        </div>
        <p className="pt-4 text-sm text-blue-100">
          15 days free trial • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  )
}
