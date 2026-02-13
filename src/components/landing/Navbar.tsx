import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const APP_URL = "https://app.gosafespend.com";

const navItems = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it Works" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];

const pageLinks = [
  { path: "/blog", label: "Blog" },
  { path: "/tools/budget-calculator", label: "Tools" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      <nav className="fixed top-0.5 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/");
                  }
                }}
                className="flex items-center gap-2"
              >
                <img src={logo} alt="Safe Spend logo" className="h-9 w-9" width={36} height={36} />
                <span className="text-xl font-bold text-foreground">Safe Spend</span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => scrollToSection(item.id), 100);
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              {pageLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.path);
                  }}
                  className="relative px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground btn-ripple"
              >
                <a href={APP_URL}>
                  Start Free Trial
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop - outside nav to avoid backdrop-blur containing block */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[51] md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu - outside nav to avoid backdrop-blur containing block */}
      <motion.div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className="md:hidden fixed top-[66px] inset-x-0 bottom-0 bg-background z-[52] overflow-y-auto"
        initial={false}
        animate={{
          x: isOpen ? 0 : "100%",
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  navigate("/");
                  setTimeout(() => scrollToSection(item.id), 100);
                } else {
                  scrollToSection(item.id);
                }
              }}
              className={`block w-full text-left py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
          {pageLinks.map((link, index) => (
            <motion.a
              key={link.path}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(link.path);
                setIsOpen(false);
              }}
              className="block w-full text-left py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary text-muted-foreground hover:text-foreground hover:bg-muted/50 min-h-[44px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: (navItems.length + index) * 0.05 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px]"
            >
              <a href={APP_URL}>Start Free Trial</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
