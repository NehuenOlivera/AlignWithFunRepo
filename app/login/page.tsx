export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailLogin } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { OAuthButtons } from "./oauthSignIn";
import Header from "@/components/header";
import Link from "next/link";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const resolvedParams = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <>
      <Header />

      <section className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-10 bg-linear-to-br from-(--color-dark-green) to-[#101010]">
        <Card
          className="
        w-full max-w-md
        rounded-2xl
        bg-(--color-beige)
        shadow-xl
        p-6
      "
        >
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-(--color-dark-green)">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-(--color-dark-green)/70">
              Sign in to continue your journey
            </p>
          </CardHeader>

          <CardContent className="space-y-8 mt-4">
            <OAuthButtons />
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-(--color-dark-green)/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white/70 text-(--color-dark-green)/60">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form id="login-form" className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-(--color-dark-green) font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="
                bg-white/60 backdrop-blur-sm
                border border-(--color-dark-green)
                text-(--color-dark-green)
                placeholder-[#022e14]/40
                rounded-xl h-11
                focus:ring-2 focus:ring-[#022e14]/30
              "
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-(--color-dark-green) font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  placeholder="••••••••"
                  required
                  className="
                bg-white/60 backdrop-blur-sm
                border border-(--color-dark-green)
                text-(--color-dark-green)
                placeholder-(--color-dark-green)/40
                rounded-xl h-11
                focus:ring-2 focus:ring-(--color-dark-green)/30
              "
                />
              </div>

              {resolvedParams.message && (
                <div className="text-sm p-3 bg-red-50 text-red-700 rounded-xl border border-red-200">
                  {resolvedParams.message}
                </div>
              )}

              <Button
                formAction={emailLogin}
                className="
              w-full h-11
              rounded-xl
              bg-(--color-dark-green) text-white font-semibold
              hover:bg-[#023619]
              transition-all
              shadow-md hover:shadow-lg active:scale-[0.98]
            "
              >
                Sign In
              </Button>
            </form>
            <p className="text-center text-sm text-(--color-dark-green)/70">
              Don&apos;t have an account?{" "}
              <Link
                href={"/signup"}
                className="text-(--color-dark-green) font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
