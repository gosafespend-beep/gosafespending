import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WaitlistResult {
  success: boolean;
  alreadyExists?: boolean;
  error?: Error;
}

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const joinWaitlist = async (email: string): Promise<WaitlistResult> => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: email.toLowerCase() });

      if (error) {
        // Handle duplicate email (unique constraint violation)
        if (error.code === "23505") {
          toast.success("You're already on the Safe Spend waitlist 🎉");
          return { success: true, alreadyExists: true };
        }
        throw error;
      }

      toast.success("Thanks for joining Safe Spend! We'll be in touch soon.");
      return { success: true, alreadyExists: false };
    } catch (error) {
      console.error("Waitlist error:", error);
      toast.error("Something went wrong. Please try again.");
      return { success: false, error: error as Error };
    } finally {
      setIsLoading(false);
    }
  };

  return { joinWaitlist, isLoading };
};
