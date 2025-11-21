const testimonials = [
  {
    name: 'John Mwale',
    role: 'Customer',
    feedback: 'Great experience! Found the perfect family car at an affordable price. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sarah Banda',
    role: 'First-time Buyer',
    feedback: 'The team was very helpful and transparent. No hidden costs. I\'m very satisfied with my purchase.',
    rating: 5,
  },
  {
    name: 'David Chanda',
    role: 'Business Owner',
    feedback: 'Excellent customer service and quality vehicles. Will be recommending to my colleagues.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-black text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-400">
            Trusted by thousands of happy customers across Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-primary rounded-lg p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "{testimonial.feedback}"
              </p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
