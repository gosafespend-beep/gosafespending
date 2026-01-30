import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseWaitlistCountResult {
  count: number;
  isLoading: boolean;
  error: Error | null;
}

export const useWaitlistCount = (): UseWaitlistCountResult => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Use secure RPC function that doesn't expose email data
        const { data, error: fetchError } = await supabase
          .rpc("get_waitlist_count");

        if (fetchError) throw fetchError;

        // Add base count for social proof (simulated early adopters)
        const baseCount = 1000;
        setCount((data || 0) + baseCount);
      } catch (err) {
        // Don't log error details to client console
        setError(err instanceof Error ? err : new Error("Failed to fetch count"));
        // Fallback to base count on error
        setCount(1000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, isLoading, error };
};
