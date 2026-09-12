import { Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-12 text-gray-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                PL
              </div>
              PhoneLedger
            </div>
            <p className="text-sm text-gray-400">
              Manage your second-hand phone business with confidence and ease.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-center text-sm font-semibold text-white">
              Product
            </h4>
            <ul className="space-y-2 text-center">
              <li>
                <a
                  href="#features"
                  className="text-sm transition-colors hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm transition-colors hover:text-white"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; 2025 PhoneLedger. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:zaidsunasra26@gmail.com.com"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+919819280904"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
