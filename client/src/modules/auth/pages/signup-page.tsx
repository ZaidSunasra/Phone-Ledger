import { ArrowLeft } from "lucide-react"
import { SignupForm } from "../components/signup-form"
import SignupSVG from "@/assets/shaking-hands.svg"
import { NavLink } from "react-router"

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <NavLink to="/" className="flex items-center gap-2 font-medium">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <ArrowLeft className="size-4" />
                        </div>
                        Phone Ledger
                    </NavLink>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="hidden bg lg:flex justify-center items-center bg-muted">
                <img
                    src={SignupSVG}
                    alt="Image"
                    className="h-4/5 w-4/5 dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
