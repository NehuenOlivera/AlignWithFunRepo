"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { JSX } from "react";
import { FcGoogle } from "react-icons/fc";
import { oAuthSignIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const providers: OAuthProvider[] = [
    {
      name: "google",
      displayName: "Google",
      icon: <FcGoogle size={24} className="shrink-0" />,
    },
  ];
  return (
    <>
      {providers.map((provider) => (
        <Button
          key={provider.name}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white"
          variant="outline"
          onClick={async () => await oAuthSignIn(provider.name)}
        >
          {provider.icon}
          Log in with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
