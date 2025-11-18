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
    <header className="header z-10 sticky top-0 w-full bg-white/10 backdrop-blur border-b border-white/20">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">AWF</span>
          </a>

          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <form action={signOut} className="flex items-center gap-2">
              <p>{userName}</p>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
