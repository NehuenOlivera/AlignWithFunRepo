export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailLogin, signup } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { OAuthButtons } from "./oauthSignIn";
import Header from "@/components/header";

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
      <section className="min-h-[calc(100vh-70px)] flex justify-center items-center px-4 py-8">
        <Card className="card w-9/10 md:w-full max-w-md bg-[#f5ece5] shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl text-[#022e14]">Welcome</CardTitle>
            <p className="text-sm text-[#101010]/70">
              Sign in to your account to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Login Form */}
            <form id="login-form" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#022e14] font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-white border border-[#022e14]/20 text-[#022e14] placeholder-[#101010]/50 rounded-10"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-[#022e14] font-medium"
                >
                  Password
                </Label>
                <Input
                  minLength={6}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-white border border-[#022e14]/20 text-[#101010] placeholder-[#101010]/50 rounded-10"
                />
              </div>

              {resolvedParams.message && (
                <div className="text-sm p-3 bg-red-50 text-red-700 rounded-10 border border-red-200">
                  {resolvedParams.message}
                </div>
              )}

              <div className="mt-6!">
                <Button
                  formAction={emailLogin}
                  className="w-full bg-[#022e14] text-[#f5ece5] hover:bg-[#022e14]/90 rounded-10 font-semibold h-11"
                >
                  Sign In
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-2!">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#101010]/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#f5ece5] text-[#101010]/60">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <OAuthButtons />

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#101010]/70">
              Don&apos;t have an account?{" "}
              <button
                formAction={signup}
                form="login-form"
                className="text-[#022e14] font-semibold hover:underline transition-colors"
              >
                Create one
              </button>
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
