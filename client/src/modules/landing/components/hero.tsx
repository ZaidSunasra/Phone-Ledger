import { ArrowRight, TrendingUp, ShoppingCart, Smartphone, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-balance">
                Manage Your Second-Hand Phone Business with Confidence
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed text-balance">
                Track purchases, sales, profits, IMEI numbers, customers, and inventory from one simple dashboard built specifically for mobile phone retailers.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4">
                Login
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">0+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">0+</div>
                <div className="text-sm text-gray-600">Shops Using</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">0K+</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">₹0K+</div>
                <div className="text-sm text-gray-600">Sales Tracked</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Dashboard</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">Total in Stock</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">1,245</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className="text-sm text-gray-600">Sold Today</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">42</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Profit Today</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">₹8,450</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <IndianRupee className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">Avg Margin</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">24%</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Transactions</h4>
                  <div className="space-y-2">
                    {[
                      { model: 'iPhone 14 Pro', type: 'Sold', amount: '₹45,000', time: '2 hrs ago' },
                      { model: 'Samsung S23', type: 'Purchased', amount: '₹38,000', time: '4 hrs ago' },
                      { model: 'OnePlus 11', type: 'Sold', amount: '₹28,000', time: '6 hrs ago' },
                    ].map((transaction, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <div className="font-medium text-gray-900">{transaction.model}</div>
                          <div className="text-xs text-gray-500">{transaction.time}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${transaction.type === 'Sold' ? 'text-emerald-600' : 'text-gray-600'}`}>
                            {transaction.amount}
                          </div>
                          <div className="text-xs text-gray-500">{transaction.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
