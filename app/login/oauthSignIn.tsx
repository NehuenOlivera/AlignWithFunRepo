"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { JSX, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { oAuthSignIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const providers: OAuthProvider[] = [
    {
      name: "google",
      displayName: "Google",
      icon: <FcGoogle size={20} className="shrink-0" />,
    },
  ];
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          className={`w-full flex items-center justify-center gap-3 bg-white text-[#101010] hover:bg-white/90 border border-[#101010]/10 rounded-10 font-semibold h-11 transition-all ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          variant="outline"
          onClick={async () => {
            setIsLoading(true);
            await oAuthSignIn(provider.name);
            setIsLoading(false);
          }}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-(--color-dark-green) border-t-transparent" />
          ) : (
            <>
              {provider.icon}
              Continue with {provider.displayName}
            </>
          )}
        </Button>
      ))}
    </div>
  );
}
