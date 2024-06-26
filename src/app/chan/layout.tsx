import { Metadata } from "next";
import { ReactNode } from "react";
import ChanLayoutChild from "./layoutChild";
interface ChanLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Chan",
  description: "Serving The People Chan",
  themeColor: "#F4F4FE",
};

export default function ChanLayout(props: ChanLayoutProps) {
  return <ChanLayoutChild children={props.children} />;
}
