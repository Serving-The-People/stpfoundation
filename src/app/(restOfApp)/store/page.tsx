import ThemeComponent from "@/components/ThemeComponent";
import ShopifyComponent from "@/components/foundation/store/ShopifyComponent";
import logo from "@/images/STP.Foundation.Logo.svg";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Store",
  themeColor: "#fff",
};

export default function Store() {
  return (
    <div className="flex w-full flex-col place-content-center">
      <ThemeComponent color="#fff" />
      <Image
        src={logo}
        alt="Serving the People Flower"
        width={70}
        className="absolute left-0 right-0 top-4 ml-auto mr-auto md:static md:mt-5 md:self-center"
      />
      <div className="mb-4 mt-24 md:my-4">
        <ShopifyComponent />
      </div>
    </div>
  );
}
