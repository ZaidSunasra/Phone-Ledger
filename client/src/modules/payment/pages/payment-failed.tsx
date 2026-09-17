import { Link } from "react-router"
import { CircleX } from "lucide-react"

const PaymentFailedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <CircleX className="size-9 text-destructive" />
        </div>

        <h1 className="text-2xl font-semibold">Payment Failed</h1>

        <p className="mt-2 text-muted-foreground">
          We couldn't process your payment. No worries, you can return to the
          dashboard and try again.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default PaymentFailedPage
