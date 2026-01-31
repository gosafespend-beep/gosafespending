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
    const normalizedEmail = email.toLowerCase();

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: normalizedEmail });

      if (error) {
        // Handle duplicate email (unique constraint violation)
        if (error.code === "23505") {
          toast.success("You're already on the Safe Spend waitlist 🎉");
          return { success: true, alreadyExists: true };
        }
        throw error;
      }

      // Send confirmation email via edge function
      try {
        const { error: emailError } = await supabase.functions.invoke("send-waitlist-email", {
          body: { email: normalizedEmail },
        });

        if (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // Don't fail the whole operation if email fails
        }
      } catch (emailErr) {
        console.error("Email service error:", emailErr);
        // Don't fail the whole operation if email fails
      }

      toast.success("Thanks for joining Safe Spend! Check your inbox for confirmation.");
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
