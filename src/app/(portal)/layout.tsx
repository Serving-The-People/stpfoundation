import ThemeComponent from "@/Components/ThemeComponent";
import Footer from "@/Components/portal/footer/Footer";
import Header from "@/Components/portal/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serving the People",
  themeColor: "#000",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center bg-black">
      <ThemeComponent color="#000" />
      <Header />
      <div className="mx-4 max-w-[800px] text-white">{children}</div>
      <Footer />
    </div>
  );
}

export default RootLayout;
