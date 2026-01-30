import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      alt={name}
      className="w-12 h-12 rounded-full bg-primary/20"
      onError={() => setImgError(true)}
    />
  );
};

export const TestimonialsCarousel = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by thousands of users
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            See what our community has to say about transforming their financial lives with Safe Spend.
          </p>
          
          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-medium text-foreground">4.9/5</span>
            <span>from 500+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-full bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                    {/* Quote mark */}
                    <div className="text-4xl text-primary/20 font-serif leading-none mb-2">"</div>
                    
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
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden lg:flex bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:flex bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
