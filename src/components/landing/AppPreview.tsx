import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BrowserFrame } from "./BrowserFrame";
import { FeatureAnnotation } from "./FeatureAnnotation";
import { DashboardMockup } from "./DashboardMockup";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const AppPreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`scroll-anim transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <motion.div 
            className="relative"
            style={{ y, opacity }}
          >
            {/* Floating annotations */}
            <FeatureAnnotation 
              position={{ top: "15%", left: "-5%" }} 
              delay={0.2}
            >
              📊 Real-time expense tracking
            </FeatureAnnotation>
            
            <FeatureAnnotation 
              position={{ top: "35%", right: "-5%" }} 
              delay={0.4}
            >
              💰 Smart budget suggestions
            </FeatureAnnotation>
            
            <FeatureAnnotation 
              position={{ bottom: "25%", left: "-5%" }} 
              delay={0.6}
            >
              🎯 Goal progress at a glance
            </FeatureAnnotation>

            {/* Gradient border container with browser frame */}
            <div className="gradient-border p-[2px] rounded-2xl">
              <BrowserFrame>
                <DashboardMockup />
              </BrowserFrame>
            </div>

            {/* Reflection effect */}
            <div className="hidden lg:block absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-b from-primary/10 to-transparent blur-2xl rounded-full" />

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-primary via-accent to-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
