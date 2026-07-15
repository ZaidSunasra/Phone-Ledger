import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-16 sm:py-24 bg-blue-600 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Ready to Simplify Your Mobile Shop?
          </h2>
          <p className="text-lg text-blue-100 text-balance">
            Join hundreds of retailers managing their business with confidence.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 font-semibold">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-blue-500 px-8 py-4 font-semibold"
          >
            Login
          </Button>
        </div>
        <p className="text-sm text-blue-100 pt-4">
          15 days free trial • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
}
