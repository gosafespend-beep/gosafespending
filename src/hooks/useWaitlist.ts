import { useState } from "react";
import { toast } from "sonner";

const WAITLIST_STORAGE_KEY = "safespend_waitlist";

interface WaitlistResult {
  success: boolean;
  alreadyExists?: boolean;
  error?: Error;
}

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getStoredEmails = (): string[] => {
    try {
      const stored = localStorage.getItem(WAITLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const joinWaitlist = async (email: string): Promise<WaitlistResult> => {
    setIsLoading(true);

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const emails = getStoredEmails();

      // Check for duplicate
      if (emails.includes(email.toLowerCase())) {
        toast.success("You're already on the SafeSpend waitlist 🎉");
        return { success: true, alreadyExists: true };
      }

      // Add new email
      emails.push(email.toLowerCase());
      localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(emails));

      toast.success("Thanks for joining SafeSpend! We'll be in touch soon.");
      return { success: true, alreadyExists: false };
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      return { success: false, error: error as Error };
    } finally {
      setIsLoading(false);
    }
  };

  return { joinWaitlist, isLoading };
};
