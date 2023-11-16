import { Container } from "@/components/Container";
import nyscaLogo from "@/images/nyscaLogo.png";
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import DonateButton from "./DonateButton";

export const metadata: Metadata = {
  title: "Support",
};

const Membership = () => {
  return (
    <Container className="mb-8 mt-6 max-w-[800px] text-slate-800">
      <div>
        <h1>We need your support!</h1>
        <p>
          {`Your contribution directly supports Serving the People's public
          programs. By joining our community, you can enjoy priority access to
          events and support artists globally.`}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mb-8 text-lg">Make a tax-deductible donation today</h2>
        </div>
        <p>
          {`With your support, Serving the People can continue to offer a wide
          range of resources and opportunies to artists. There include access to
          a community of fellow artists and supporters, as well as workshops,
          mentorship, events, and strengthen the arts community as a whole.`}
        </p>
        <DonateButton />
      </div>
      <div>
        <h1></h1>
        <p>
          Serving the People's programs are supported, in part, by public funds
          from the New York State Council on the Arts.
        </p>
        <Image
          src={nyscaLogo}
          alt="New York State of Opportunity | Council on the Arts"
          className="h-auto w-[290px]"
        />
      </div>
    </Container>
  );
};

export default Membership;
