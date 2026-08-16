import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { VisualBreadcrumbs } from "@/components/seo/VisualBreadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useLiveAnnouncer } from "@/hooks/useLiveAnnouncer";
import { track } from "@/lib/analytics";
import logo from "@/assets/logo.webp";

/*
 * Mirrors the validation the newsletter form already used. Client-side checks
 * are UX only -- the edge function enforces the same limits independently,
 * because anything sent from the browser is attacker-controlled.
 */
const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message")
    .max(5000, "Message is too long (5000 characters max)"),
});

const Contact = () => {
  const { toast } = useToast();
  const { announce } = useLiveAnnouncer();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const message = parsed.error.errors[0].message;
      toast({ title: "Check your details", description: message, variant: "destructive" });
      announce(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email.toLowerCase(),
          message: parsed.data.message,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      announce("Message sent. We'll get back to you as soon as possible.");
      track("contact_submitted", { result: "success" });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      const description =
        "Please try again or email us directly at info@gosafespend.com";
      toast({
        title: "Something went wrong",
        description,
        variant: "destructive",
      });
      announce(description);
      track("contact_submitted", { result: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Safe Spend logo" className="h-8 w-8" width={32} height={32} />
            <span className="text-lg font-bold text-foreground">Safe Spend</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <VisualBreadcrumbs />
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help?"
                  rows={5}
                  required
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Email Us</h3>
              </div>
              <p className="text-muted-foreground mb-2">For general inquiries:</p>
              <a
                href="mailto:info@gosafespend.com"
                className="text-primary hover:underline"
              >
                info@gosafespend.com
              </a>
            </div>

            {/* FAQ Link */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <HelpCircle className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Check Our FAQ</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Find quick answers to common questions.
              </p>
              <Link
                to="/#faq"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                View FAQ →
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies-policy" className="hover:text-foreground transition-colors">
              Cookies Policy
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} Safe Spend. Your finances, simplified.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
