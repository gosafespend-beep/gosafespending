import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Import profile images
import sarahImg from "@/assets/testimonials/sarah-m.jpg";
import marcusImg from "@/assets/testimonials/marcus-t.jpg";
import jenniferImg from "@/assets/testimonials/jennifer-l.jpg";
import davidImg from "@/assets/testimonials/david-k.jpg";
import aishaImg from "@/assets/testimonials/aisha-r.jpg";
import carlosImg from "@/assets/testimonials/carlos-p.jpg";

const testimonials = [
  {
    quote: "Safe Spend helped me save $500 in my first month just by seeing where my money was going.",
    name: "Sarah M.",
    role: "Freelancer",
    avatar: "SM",
    image: sarahImg,
  },
  {
    quote: "Finally, a budgeting app that doesn't make me feel guilty. The interface is beautiful.",
    name: "Marcus T.",
    role: "Software Engineer",
    avatar: "MT",
    image: marcusImg,
  },
  {
    quote: "I paid off my credit card 6 months early using the debt payoff planner.",
    name: "Jennifer L.",
    role: "Teacher",
    avatar: "JL",
    image: jenniferImg,
  },
  {
    quote: "Running my own business means irregular income. Safe Spend helps me plan ahead and stay on top of cash flow.",
    name: "David K.",
    role: "Small Business Owner",
    avatar: "DK",
    image: davidImg,
  },
  {
    quote: "I've tried so many finance apps. This is the first one that actually stuck. Simple, beautiful, effective.",
    name: "Aisha R.",
    role: "Marketing Manager",
    avatar: "AR",
    image: aishaImg,
  },
  {
    quote: "On a tight budget, every dollar counts. Safe Spend showed me where I was wasting money on subscriptions.",
    name: "Carlos P.",
    role: "Graduate Student",
    avatar: "CP",
    image: carlosImg,
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
      className="w-12 h-12 rounded-full object-cover bg-primary/20"
      onError={() => setImgError(true)}
    />
  );
};

export const TestimonialsCarousel = () => {
  const { ref, isVisible } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();
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

  // Auto-scroll (disabled for reduced motion)
  useEffect(() => {
    if (!emblaApi || isPaused || prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused, prefersReducedMotion]);

  return (
    <section 
      id="testimonials" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 overflow-hidden"
      aria-label="Customer testimonials"
    >
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
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
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
          role="region"
          aria-label="Testimonial carousel"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
                >
                  <article className="h-full bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                    {/* Quote mark */}
                    <div className="text-4xl text-primary/20 font-serif leading-none mb-2" aria-hidden="true">"</div>
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-4" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <footer className="flex items-center gap-3">
                      <Avatar
                        image={testimonial.image}
                        fallback={testimonial.avatar}
                        name={testimonial.name}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <cite className="font-semibold text-foreground not-italic">{testimonial.name}</cite>
                          <CheckCircle className="h-4 w-4 text-primary" aria-label="Verified" />
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </footer>
                  </article>
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
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:flex bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30"
            onClick={scrollNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1 mt-8" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="p-2 flex items-center justify-center min-w-[44px] min-h-[44px]"
              onClick={() => scrollTo(index)}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
