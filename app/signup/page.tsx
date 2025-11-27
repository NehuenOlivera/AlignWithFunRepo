export const dynamic = "force-dynamic";

import Header from "@/components/header";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignupForm from "@/components/signupForm";

export default async function Signup({
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

      <section className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-4 bg-linear-to-br from-[#0a1f12] to-[#101010]">
        <Card className="w-full max-w-md rounded-2xl bg-[#f5ece5] shadow-xl px-5 py-3">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#022e14]">
              {resolvedParams.message === "success"
                ? "Almost done!"
                : "Create an Account"}
            </CardTitle>
            <p className="text-sm text-[#022e14]/70">
              {resolvedParams.message === "success"
                ? "Just need to verify your email"
                : "Start your pilates journey with us"}
            </p>
          </CardHeader>

          <CardContent className="space-y-4 mt-2">
            {/* SUCCESS MESSAGE */}
            {resolvedParams.message === "success" ? (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-center space-y-2">
                <p className="font-semibold">Check your inbox 📩</p>
                <p className="text-sm">
                  We&apos;ve sent a confirmation email to activate your account.
                </p>
              </div>
            ) : (
              <SignupForm serverError={resolvedParams.message} />
            )}

            <p className="text-center text-sm text-[#022e14]/70">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-[#022e14] font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
