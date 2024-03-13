import ThemeComponent from "@/components/ThemeComponent";
import ShopifyComponent from "@/components/foundation/store/ShopifyComponent";
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
      <div className="mb-4 mt-24 md:my-4">
        <ShopifyComponent />
      </div>
    </div>
  );
}
