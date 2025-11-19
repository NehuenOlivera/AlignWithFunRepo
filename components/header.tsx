/* eslint-disable @next/next/no-html-link-for-pages */
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userName: string | null = null;
  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("first_name")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      userName = data.first_name;
    }
  }

  return (
    <header className="header z-50 sticky top-0 w-full">
      <div className="container max-w-6xl mx-auto px-6 py-4">
        <div className="flex h-auto items-center justify-between">
          {/* Logo */}
          <a
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            href="/"
          >
            <span className="font-bold text-lg text-[#f5ece5]">AWF</span>
          </a>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user !== null ? (
              <form action={signOut} className="flex items-center gap-4">
                <nav className="flex items-center space-x-8">
                  {user && (
                    <Link
                      href="/profile"
                      className="text-sm font-medium text-[#f5ece5]/80 hover:text-[#f5ece5] transition-colors"
                    >
                      My Profile
                    </Link>
                  )}
                </nav>
                <Button
                  className="text-sm !px-2 py-2 bg-[#022e14] text-[#f5ece5] hover:bg-[#022e14]/90 rounded-10 font-semibold"
                  variant="outline"
                >
                  Sign Out
                </Button>
              </form>
            ) : (
              <Button
                asChild
                className="text-sm !px-4 py-2 bg-[#022e14] text-[#f5ece5] hover:bg-[#022e14]/90 rounded-10 font-semibold"
                variant="outline"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
