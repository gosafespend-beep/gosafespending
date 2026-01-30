import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import appPreviewImage from "@/assets/app-preview.png";

export const AppPreview = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Gradient border container */}
          <div className="gradient-border p-[2px] rounded-2xl">
            <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={appPreviewImage} 
                alt="Safe Spend Dashboard - Track expenses, budgets, and savings goals"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-primary via-accent to-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
