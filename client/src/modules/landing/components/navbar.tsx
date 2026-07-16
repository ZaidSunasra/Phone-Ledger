import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router';

export function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold p-2">
            PL
          </div>
          PhoneLedger
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-md font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </a>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Button onClick={() => navigate("/login")} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 p-4">
            Login
          </Button>
          <Button onClick={() => navigate("/signup")} className="bg-blue-600 text-white hover:bg-blue-700 p-4">
            Get Started
          </Button>
        </div>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6 md:hidden">
          <div className="space-y-4">
            <a href="#features" className="block text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="block text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <Button onClick={() => navigate("/login")} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Login
              </Button>
              <Button onClick={() => navigate("/signup")} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
