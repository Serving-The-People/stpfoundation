import Footer from "@/tempname/foundation/footer/Footer";
import Header from "@/tempname/foundation/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serving the People",
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-4 flex min-h-[100svh] flex-col items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
