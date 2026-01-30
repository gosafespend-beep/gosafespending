import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStickyBar } from "@/hooks/useStickyBar";
import { useWaitlist } from "@/hooks/useWaitlist";

export const StickyWaitlistBar = () => {
  const { showBar, dismissBar } = useStickyBar();
  const [email, setEmail] = useState("");
  const { joinWaitlist, isLoading } = useWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    const result = await joinWaitlist(email);
    const success = result.success;
    if (success) {
      setEmail("");
      dismissBar();
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50 transition-transform duration-300 ${
        showBar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-foreground font-medium hidden sm:block">
          Ready to take control of your finances?
        </p>
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 sm:flex-none w-full sm:w-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 text-sm flex-1 sm:w-64"
            required
          />
          <Button 
            type="submit" 
            size="sm" 
            disabled={isLoading}
            className="whitespace-nowrap"
          >
            {isLoading ? "..." : "Join Waitlist"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={dismissBar}
            className="p-2 h-9 w-9"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
