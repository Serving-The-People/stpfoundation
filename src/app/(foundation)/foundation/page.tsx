import { Container } from "@/Components/Container";
import personnel from "@/data/personnel.json";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Mission",
};

export default function Community() {
  return (
    <>
      <div className="my-6 max-w-[800px]">
        <Container className="">
          <div className="text-slate-800">
            <h1>Mission</h1>
            <p className="mt-6">
              {`Serving the People is a 501(c)(3) non-profit organization committed to
              assisting creatives in making meaningful connections both online and in
              person. Established in 2017, STP has launched a number of initiatives
              and developed a platform for connecting creators with audiences, as well
              as finding opportunities for collaboration and support.`}
            </p>
          </div>

          <div>
            <h1>The STP Creative Foundation</h1>
            <p>
              <>
                {`Established as an integral arm of STP, The STP Creative Foundation
              has a singular purpose: to host enriching discussion groups in
              various cities, thereby fostering an environment of shared
              knowledge and growth. Beyond these discussions, the Foundation
              extends its outreach through programming, including workshops,
              lectures, and more, thereby ensuring a holistic approach to
              community development.`}
              </>
            </p>
            <p>
              <>
                {`Our commitment to prioritizing community over profits is made
              tangible through this foundation. Funds generated from our
              for-profit ventures are channeled into the foundation, ensuring
              that every venture indirectly contributes to our overarching goal
              of cultural enrichment.`}
              </>
            </p>
            <p>
              <>
                {`STP's for-profit projects, ranging from clothing lines to
              cutting-edge software like Studio, aren't just revenue generators.
              They are the lifeblood that fuels our mission, enabling us to
              invest more into the community. Through the innovative `}
                <Link
                  href="https://seedsdao.vercel.app/"
                  target="_blank"
                  className="underline"
                >
                  SEEDS
                </Link>
                {` project, we embrace the future of decentralized decision-making,
              allowing community participation in shaping our creative
              endeavors.`}
              </>
            </p>
          </div>
          <div className="grid grid-cols-2 justify-between gap-y-10 text-slate-800 sm:grid-cols-3">
            {personnel.items.map((group, index) => (
              <ul
                key={group.name}
                className={
                  index === personnel.items.length - 1 ? "" : "flex-grow"
                }
              >
                <li className="mb-2 text-base/8 text-slate-500">
                  {group.name}
                </li>
                <ul>
                  {group.children.map((member) => (
                    <li
                      key={member.name}
                      className="text-base/6 font-bold tracking-[0.1px] text-slate-800"
                    >
                      {member.name}
                    </li>
                  ))}
                </ul>
              </ul>
            ))}
          </div>
        </Container>
      </div>
      <div className="mb-8 mt-auto max-w-[800px]">
        <p className="font-serif text-lg/8 tracking-[.035rem] text-slate-800">
          {`We understand that dialogue is what drives societal transformation and catalyzes profound progress.`}
        </p>
      </div>
    </>
  );
}
