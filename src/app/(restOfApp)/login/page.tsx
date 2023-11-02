"use client";

import Header from "@/components/foundation/header/Header";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import flowerLogo from "@/images/flowerLogo.svg";
import ThemeComponent from "@/components/ThemeComponent";

const Welcome = () => {
  const { get } = useSearchParams();
  const url = get("redirect_url");

  return (
    <div className="flex h-[70vh] flex-col place-content-center font-sans">
      <ThemeComponent color="#fff" />
      {/* <Image
        src={flowerLogo}
        alt="Serving the People Flower Logo"
        className="absolute left-0 right-0 top-4 ml-auto mr-auto md:top-[3.75rem]"
      /> */}
      <SignIn afterSignInUrl={url ?? "/"} afterSignUpUrl={url ?? "/"} />
    </div>
  );
};

export default Welcome;
