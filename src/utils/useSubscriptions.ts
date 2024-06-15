import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

export function useSubscription() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orderSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          console.log(payload);
        }
      )
      .subscribe();
    return () => {
      orderSubscription.unsubscribe();
    };
  }, []);
}
export function useUpdateSubscription(id: string) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orderSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders", id] });
          console.log(payload);
        }
      )
      .subscribe();
    return () => {
      orderSubscription.unsubscribe();
    };
  }, []);
}