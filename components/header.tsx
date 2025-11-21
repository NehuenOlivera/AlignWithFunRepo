/* eslint-disable @next/next/no-html-link-for-pages */
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { getUserWithRole } from "@/utils/supabase/getUserWithRole";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userWithRole = await getUserWithRole();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <a href="/" className="header-logo">
            AWF
          </a>

          {user && userWithRole?.role === "admin" && (
            <a href="/adminPage" className="header-admin-link">
              Admin Panel
            </a>
          )}
        </div>

        <div className="header-right">
          {user ? (
            <form action={signOut} className="header-auth">
              <Link href="/profile" className="header-profile-link">
                My Profile
              </Link>

              <Button className="header-signout-btn" variant="outline">
                Sign Out
              </Button>
            </form>
          ) : (
            <Button asChild className="header-login-btn" variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
