import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Plan } from "@phone-ledger/shared"

const PricingCard = ({
  plan,
  isYearly = false,
  isBusy,
  onCheckout,
}: {
  plan: Plan
  isYearly?: boolean
  isBusy: boolean
  onCheckout: (planId: string) => void
}) => {
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {isYearly && (
        <div className="absolute top-4 right-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Save 10%
        </div>
      )}

      <div className="p-6">
        <div>
          <p className="text-sm font-medium tracking-wider text-blue-600 uppercase">
            {plan.name}
          </p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-bold tracking-tight text-slate-900">
              ₹{plan.price.toLocaleString("en-IN")}
            </span>

            <span className="pb-2 text-sm text-slate-500">
              /{isYearly ? "year" : "month"}
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Everything you need to manage your mobile shop.
          </p>
        </div>

        <div className="my-6 border-t border-slate-100" />

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Check className="size-4 text-green-600" />
            <span>
              {plan.maxShops} {plan.maxShops === 1 ? "shop" : "shops"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Check className="size-4 text-green-600" />
            <span>
              Up to {plan.maxMembers}{" "}
              {plan.maxMembers === 1 ? "member" : "members"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Check className="size-4 text-green-600" />
            <span>{plan.billingDays} days access</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Check className="size-4 text-green-600" />
            <span>15-day free trial</span>
          </div>
        </div>

        <Button
          className="mt-7 w-full"
          size="lg"
          onClick={() => onCheckout(plan.id)}
          disabled={isBusy}
        >
          {isBusy ? "Processing..." : "Upgrade"}
        </Button>

        <p className="mt-3 text-center text-xs text-slate-400">
          No credit card required for the trial
        </p>
      </div>
    </div>
  )
}

export default PricingCard
