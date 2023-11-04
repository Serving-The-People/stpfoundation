"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import ThemeComponent from "@/components/ThemeComponent";

const Welcome = () => {
  const { get } = useSearchParams();
  const url = get("redirect_url");

  return (
    <div className="flex h-[70vh] flex-col place-content-center font-sans">
      <ThemeComponent color="#fff" />
      <SignIn afterSignInUrl={url ?? "/"} afterSignUpUrl={url ?? "/"} />
    </div>
  );
};

export default Welcome;
