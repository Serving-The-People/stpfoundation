import { Container } from "@/tempname/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Meetings",
};

export default function IndexPage() {
  return (
    <>
      <Container className="my-6 w-full max-w-[800px]">
        <div>
          <h1>Meetings</h1>
          <p>
            {`We host weekly in-person discussions led by artists, providing a space 
              for creative collaboration and dialogue. These meetings offer members the 
              opportunity to connect and engage in meaningful dialogue about their work, 
              ideas, and projects. They are designed to foster a supportive and inclusive environment 
              where members can share their experiences and learn from one another.`}
          </p>
          <iframe
            src="https://lu.ma/embed/calendar/cal-4veiS7H2EnbSJMW/events?lt=light"
            className="h-[55vh] w-full max-w-[800px] rounded-md border border-slate-200"
            allowFullScreen={true}
            aria-hidden="false"
            tabIndex={parseInt("0")}
          />
        </div>
      </Container>
      <div className="mb-8 max-w-[800px]">
        <p className="font-serif text-lg/8 tracking-[.035rem] text-slate-800">
          {`We understand that dialogue is what drives societal transformation and catalyzes profound progress.`}
        </p>
      </div>
    </>
  );
}
