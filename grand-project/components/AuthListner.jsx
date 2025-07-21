"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AuthListener({ children }) {
  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Check if user profile exists in Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", session.user.id)
          .single();

        if (!data) {
          router.push("/onboarding"); // No profile —> Go to onboarding
        } else {
          router.push("/dashboard"); // Profile exists —> Go to dashboard
        }
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return <>{children}</>;
}
