"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function GetStartedRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
  
      if (sessionError || !session) {
        console.log("No session, redirecting to signup...");
        router.replace("/signup");
        return;
      }
  
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      console.log("User info:", user);
  
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, focus")
        .eq("id", session.user.id)
        .single();
  
      console.log("Fetched profile:", profile);
      console.log("Profile fetch error:", profileError);
  
      if (profileError || !profile?.name || !profile?.focus) {
        console.log("Missing profile data, redirecting to onboarding...");
        router.replace("/onboarding");
      } else {
        console.log("Profile complete, redirecting to dashboard...");
        router.replace("/dashboard");
      }
    };
  
    redirectUser();
  }, [router]);
  

  return (
    <div className="h-screen flex items-center justify-center text-lg font-medium text-gray-600">
      Redirecting you...
    </div>
  );
}
