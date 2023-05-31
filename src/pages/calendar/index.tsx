import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";

import css from "../../Components/Calendar/Calendar.module.css";
import { UserContext } from "../../Components/UserContext";
import Calendar from "../../Components/Calendar";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function IndexPage() {
  const { loggedIn, isMember } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();

  const handleClick = () => {
    if (!loggedIn) {
      return confirm({
        title: "Please log in",
        description: "Please log in to submit to the calendar.",
        confirmationText: "Log in",
      }).then(() => {
        router.push("/login?redirect_url=/calendar");
      });
    } else if (!isMember) {
      return confirm({
        title: "Members only",
        description: "Please get a membership to submit to the calendar.",
        confirmationText: "Membership",
      }).then(() => {
        router.push("/membership");
      });
    } else {
      return router.push("/calendar/submit");
    }
  };

  return (
    <DefaultLayout boxClassName="!w-full">
      <div className="w-[96vw] border-[0] mt-[-18px] ml-[-2vw] p-5 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm sm:flex-row">
        <p className="pb-1 sm:pb-0 sm:pr-4">
          This calendar features events and activity submitted by the Serving the People community. All submissions are subject to review.
        </p >
        <div className="min-w-max">
          <Link
            className="min-w-max text-blue-600 underline hover:text-indigo-600"
            onClick={handleClick}
            href="#"
          >Submit to Calendar</Link>
          <Link
            className="min-w-max text-blue-600 underline pl-4 hover:text-indigo-600"
            href="https://calendar.google.com/calendar/u/1?cid=Y19lYmFlMTRjZDcyMDVhY2U3NDhjMjM3ZDU4MzFhNTlmY2FjNmJiOWFkZGZmYTM2YjIzNzEzNGZlMWE1ODI4YmUzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
            target="webapp-tab"
          >Add Calendar</Link>
        </div>
      </div >
      <div className="py-5">
        <Calendar />
      </div>
    </DefaultLayout >
  );
}
