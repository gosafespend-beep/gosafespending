import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Safe Spend helped me save $500 in my first month just by seeing where my money was going.",
    name: "Sarah M.",
    role: "Freelancer",
    avatar: "SM",
  },
  {
    quote: "Finally, a budgeting app that doesn't make me feel guilty. The interface is beautiful.",
    name: "Marcus T.",
    role: "Software Engineer",
    avatar: "MT",
  },
  {
    quote: "I paid off my credit card 6 months early using the debt payoff planner.",
    name: "Jennifer L.",
    role: "Teacher",
    avatar: "JL",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by thousands of users
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our community has to say about transforming their financial lives with Safe Spend.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
