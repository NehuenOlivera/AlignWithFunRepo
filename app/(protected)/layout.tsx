"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ProtectedLayout({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        // Check role only if required
        if (adminOnly) {
          const { data: dbUser } = await supabase
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (dbUser?.role !== "admin") router.push("/");
        }

        setLoading(false);
      }
    }
    checkSession();
  }, [router, adminOnly]);

  if (loading) return <p>Loading...</p>;
  return <>{children}</>;
}
