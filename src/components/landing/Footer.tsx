import { Twitter, Linkedin, Mail } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50 text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-12 pb-12 border-b border-border/50">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join the waitlist and be the first to know when SafeSpend launches.
          </p>
          <div className="max-w-md mx-auto">
            <WaitlistForm variant="footer" />
          </div>
        </div>

        {/* Footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Safe Spend" className="h-9 w-9" />
            <span className="text-xl font-bold">Safe Spend</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-border/50 text-sm text-muted-foreground">
          © {currentYear} SafeSpend. Your finances, simplified.
        </div>
      </div>
    </footer>
  );
};
