import { ShoppingCart, TrendingUp, Smartphone, Users, BarChart3, Package } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Record Phone Purchases',
    description: 'Quickly log incoming phone purchases with detailed information and supplier tracking.',
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: 'Manage Sales',
    description: 'Track all sales transactions with customer details and payment methods effortlessly.',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Smart OCR Scanning",
    description: "Capture phone details effortlessly with OCR, reducing manual entry while ensuring fast and accurate records.",
    icon: Smartphone,
  },
  {
    id: 4,
    title: 'Customer History',
    description: 'Keep detailed records of all customer interactions and purchase history.',
    icon: Users,
  },
  {
    id: 5,
    title: 'Profit & Loss Reports',
    description: 'Generate comprehensive reports to analyze profits, margins, and business performance.',
    icon: BarChart3,
  },
  {
    id: 6,
    title: 'Inventory Management',
    description: 'Monitor stock levels in real-time.',
    icon: Package,
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Powerful Features for Your Business</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your mobile shop efficiently in one integrated platform.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
