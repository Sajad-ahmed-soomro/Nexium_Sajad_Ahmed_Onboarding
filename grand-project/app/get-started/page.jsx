"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/lottie/Loading.json"; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function GetStartedRedirect() {
  const router = useRouter();

  useEffect(() => {
    let interval = null;
    let timeout = null;

    const redirectUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, focus")
        .eq("id", user.id)
        .single();

      if (profileError || !profile?.name || !profile?.focus) {
        router.replace("/onboarding");
      } else {
        router.replace("/dashboard");
      }
    };

    interval = setInterval(redirectUser, 1000);
    timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <Lottie
        animationData={loadingAnimation}
        loop
        className="w-64 h-64 mb-6"
      />
      <p className="text-xl font-semibold text-gray-600 animate-pulse">
        Redirecting you, please wait...
      </p>
    </div>
  );
}
