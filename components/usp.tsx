import { CheckCircle, Truck, Wrench } from 'lucide-react'

const usps = [
  {
    icon: CheckCircle,
    title: 'Quality Checked',
    description: 'Every vehicle undergoes rigorous inspection and certification',
  },
  {
    icon: Truck,
    title: 'Flexible Financing',
    description: 'Multiple financing options available to suit your budget',
  },
  {
    icon: Wrench,
    title: 'After-Sales Support',
    description: 'Comprehensive warranty and maintenance packages included',
  },
]

export default function USP() {
  return (
    <section className="bg-card py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground">
                  {usp.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
