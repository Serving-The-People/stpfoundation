import ThemeComponent from "@/tempname/ThemeComponent";
import Footer from "@/tempname/foundation/footer/Footer";
import Header from "@/tempname/foundation/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serving the People",
  themeColor: "#F4F4FE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F4F4FE]">
      <ThemeComponent color="#F4F4FE" />
      <div className="mx-4 flex min-h-[100svh] flex-col items-center">
        <Header showLogo={true} />
        {children}
        <Footer />
      </div>
    </div>
  );
}
