import React from "react"
import Calendar from "../../Components/Calendar"
import calendar from "../../Components/Calendar/Calendar.module.css"
import { CalendarRow } from "../../types"
import Link from "next/link"
import axios from "axios"
import DefaultLayout from "../../Components/Layouts/DefaultLayout"

export default function IndexPage({ calendarData }: { calendarData: CalendarRow[] }) {

  return (
    <DefaultLayout>
      <div className={calendar.body}>
            <div className={calendar.box}>
            <h1 id="top">2023 Calendar</h1>
              <p>
                To <Link href="/calendar/submit">submit</Link> to the calendar please <Link href="/login">log in</Link>.
                All submissions are subject to review. If you would like to receive updates
                you can sign up for our <Link href="#"> newsletter</Link> or <Link
                  href="https://calendar.google.com/calendar/u/1?cid=Y19mZDdkZGU5ZGY3MzBmM2Q5OTE5NjM1YmI0MzRiNDM4MTAxOGViZDg2MDY4NGUxN2ViMGU2NzAxMWY5OWIyNWYxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
                  target="webapp-tab"
                >
                  add calendar
                </Link>.
              </p>
              <p>
                By submitting to the calendar you are agreeing to our <Link href="#">Privacy Policy</Link>
              </p>
            </div>
          <Calendar />
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/api/calendar`)
  return {
    props: {
      calendarData: data,
    },
  }
}