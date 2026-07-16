import { Check, BadgePercent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = [
  "Purchase Records",
  "Sales Records",
  "Profit Analytics",
  "Customer Management",
  "Advanced Reports",
  "Export Data",
  "IMEI Search",
  "Up to 20 staff accounts",
];

type PricingCardProps = {
  price: string;
  period: string;
  description: string;
  trial: string;
  yearly?: boolean;
};

export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            One powerful plan with everything you need to manage your mobile
            shop.
          </p>
        </div>
        <Tabs defaultValue="monthly" className="w-full">
          <div className="mb-10 flex justify-center">
            <TabsList className="grid w-[320px] grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="gap-2">
                Yearly
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  Save 10%
                </span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="monthly">
            <PricingCard
              price="₹449"
              period="/month"
              description="Everything included for your mobile shop."
              trial="15 days free trial. No credit card required."
            />
          </TabsContent>
          <TabsContent value="yearly">
            <PricingCard
              price="₹4,849"
              period="/year"
              description="Pay yearly and save 10%."
              trial="15 days free trial. No credit card required."
              yearly
            />
          </TabsContent>
        </Tabs>
        <p className="mt-12 text-center text-sm text-gray-600">
          All plans include 24/7 customer support • No hidden fees • Cancel
          anytime
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  price,
  period,
  description,
  trial,
  yearly,
}: PricingCardProps) {
  return (
    <div className="relative mx-auto max-w-lg rounded-2xl border-2 border-blue-500 bg-white shadow-2xl">
      {yearly && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
            <BadgePercent className="h-4 w-4" />
            Save 10%
          </div>
        </div>
      )}
      <div className="space-y-8 p-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            Professional Plan
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gray-900">{price}</span>
            <span className="text-sm text-gray-600">{period}</span>
          </div>
          <p className="text-sm text-gray-500">{trial}</p>
        </div>
        <Button
          size="lg"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Start Free Trial
        </Button>
        <div className="space-y-4 border-t border-gray-200 pt-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}