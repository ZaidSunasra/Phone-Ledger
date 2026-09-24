import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  useCreatePaymentOrder,
  useVerifyPayment,
} from "@/api/payment/payment.mutation"
import { loadRazorpayCheckoutScript } from "@/modules/payment/utils/payment.utils"
import { useFetchPlans } from "@/api/plans/plan.queries"
import PricingCard from "../components/pricing-card"
import { useAuth } from "@/store/auth.store"
import { useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"

const SelectPlanPage = () => {
  const queryClient = useQueryClient()
  const { data, isPending, isError } = useFetchPlans()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreatePaymentOrder()
  const { mutateAsync: verifyPayment, isPending: isVerifyingPayment } =
    useVerifyPayment()
  const user = useAuth((state) => state.user)
  const navigate = useNavigate()

  const handleCheckout = async (planId: string) => {
    try {
      const { order } = await createOrder({ planId })

      const isLoaded = await loadRazorpayCheckoutScript()

      if (!isLoaded || !window.Razorpay) {
        throw new Error("Razorpay is not available right now")
      }

      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID

      const options = {
        key: keyId,
        amount: String(order.amount),
        currency: order.currency,
        name: "Phone Ledger",
        description: "Subscription purchase",
        order_id: order.razorpayOrderId,

        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          try {
            const result = await verifyPayment(response)
            if (result.payment.status === "SUCCESS") {
              queryClient.refetchQueries({ queryKey: ["me"] })
              navigate("/dashboard")
            } else {
              navigate("/payment-failed")
            }
          } catch (error) {
            console.error("Payment verification failed:", error)
            navigate("/payment-failed")
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "",
        },

        theme: {
          color: "#2563eb",
        },
      }

      const rzp = new window.Razorpay(options)

      rzp.open()
    } catch (error) {
      console.error("Checkout failed:", error)
    }
  }

  const isBusy = isCreatingOrder || isVerifyingPayment
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Loading plans...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Unable to load plans
          </h2>
          <p className="mt-2 text-sm text-slate-500">Please try again later.</p>
        </div>
      </div>
    )
  }

  const { monthly, yearly } = data.plans

  return (
    <div className="max-h-screen bg-slate-50 px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Simple pricing
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose the plan that fits your shop
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Start with a 15-day free trial and get everything you need to manage
            your phone inventory and shop.
          </p>
        </div>

        <Tabs defaultValue="monthly" className="mt-8 w-full">
          <TabsList className="mx-auto grid w-full max-w-sm grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>

            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="mt-8">
            <div className="flex justify-center">
              {monthly.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  isBusy={isBusy}
                  onCheckout={handleCheckout}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="mt-8">
            <div className="flex justify-center">
              {yearly.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  isYearly
                  isBusy={isBusy}
                  onCheckout={handleCheckout}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SelectPlanPage
