import { Star } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote: "Safe Spend helped me save $500 in my first month just by seeing where my money was going.",
    name: "Sarah M.",
    role: "Freelancer",
    avatar: "SM",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM",
  },
  {
    quote: "Finally, a budgeting app that doesn't make me feel guilty. The interface is beautiful.",
    name: "Marcus T.",
    role: "Software Engineer",
    avatar: "MT",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusT",
  },
  {
    quote: "I paid off my credit card 6 months early using the debt payoff planner.",
    name: "Jennifer L.",
    role: "Teacher",
    avatar: "JL",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=JenniferL",
  },
  {
    quote: "Running my own business means irregular income. Safe Spend helps me plan ahead and stay on top of cash flow.",
    name: "David K.",
    role: "Small Business Owner",
    avatar: "DK",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK",
  },
  {
    quote: "I've tried so many finance apps. This is the first one that actually stuck. Simple, beautiful, effective.",
    name: "Aisha R.",
    role: "Marketing Manager",
    avatar: "AR",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaR",
  },
  {
    quote: "On a tight budget, every dollar counts. Safe Spend showed me where I was wasting money on subscriptions.",
    name: "Carlos P.",
    role: "Graduate Student",
    avatar: "CP",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosP",
  },
];

interface AvatarProps {
  image: string;
  fallback: string;
  name: string;
}

const Avatar = ({ image, fallback, name }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${name}'s profile photo`}
      className="w-12 h-12 rounded-full bg-primary/20"
      width={48}
      height={48}
      onError={() => setImgError(true)}
    />
  );
};

export const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`scroll-anim text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`scroll-anim bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
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
                <Avatar
                  image={testimonial.image}
                  fallback={testimonial.avatar}
                  name={testimonial.name}
                />
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
