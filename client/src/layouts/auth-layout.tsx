import { ArrowLeftIcon } from "lucide-react"
import type { ReactNode } from "react"
import { NavLink } from "react-router"

interface AuthLayoutProps {
  children: ReactNode
  link?: string
}

const AuthLayout = ({ children, link = "/" }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <NavLink
          to={link}
          className="group flex items-center gap-2 self-center rounded-md px-2 py-1.5 text-lg font-bold transition-colors hover:bg-muted"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:-translate-x-0.5">
            <ArrowLeftIcon className="size-4" />
          </span>

          <span className="transition-colors group-hover:text-primary">
            Back to Phone Ledger
          </span>
        </NavLink>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
