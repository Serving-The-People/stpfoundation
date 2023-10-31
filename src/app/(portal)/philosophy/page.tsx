import { Container } from "@/Components/Container";
import personnel from "@/data/personnel.json";
import structureTree from "@/images/structureTree.svg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Philosophy",
};

const Philosophy: React.FC = () => {
  return (
    <Container className="mb-8">
      <div>
        <h1>Philosophy</h1>
        <p>
          <>
            {`Since the inception of STP, our unwavering philosophy has been to
            cultivate and perpetuate cultural enrichment. This isn't a mere
            statement but the very foundation on which our entire organization
            stands – from our diverse programs, unique brands, and multifaceted
            partnerships, to the nuances of our corporate structure.`}
          </>
        </p>
        <p>
          <>
            {`At the heart of STP's DNA is our commitment to ensuring that
              community well-being is always prioritized over profits. Our
              unique structural alignment, where our non-profit arm complements
              our for-profit initiatives, reinforces this commitment.`}
          </>
        </p>
      </div>
      <div>
        <h1>Overview</h1>
        <p>
          <>
            {`In the ever-evolving landscape of culture and society, we
              identified a gaping void – the need for a sustainable model of
              cultural enrichment. Recognizing the vast potential that a
              harmonious blend of community engagement and creative enterprise
              could offer, STP was born.`}
          </>
        </p>
        <p>
          <>
            {`Our approach is somewhat unconventional: leveraging the
              capabilities of a for-profit entity to propel innovative projects
              while ensuring that our nonprofit, The STP Creative Foundation,
              remains the bedrock of our operations, consistently channeling
              resources towards community engagement and growth.`}
          </>
        </p>
      </div>
      <div>
        <h1>The Structure</h1>
        <div className="flex flex-col items-center">
          <Image
            src={structureTree}
            height={1000}
            quality={100}
            alt="STP Structure Tree"
            className="mb-4"
          />
        </div>
      </div>
    </Container>
  );
};

export default Philosophy;
