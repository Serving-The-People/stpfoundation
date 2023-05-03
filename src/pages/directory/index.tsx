import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Link from "next/link"
import { Alert, AlertTitle, Box, Button } from "@mui/material"
import { useConfirm } from "material-ui-confirm"
import axios from "axios"

import css from "../../Components/Directory/Directory.module.css"
import { DirectoryRow } from "../../types"
import { loaded } from "../../redux/slices/directory"
import { UserContext } from "../../Components/UserContext"
import DefaultLayout from "../../Components/Layouts/DefaultLayout"
import DefaultLayoutCentered from "../../Components/Layouts/DefaultLayoutCentered"
import Directory from "../../Components/Directory"

export default function DirectoryPage({ data: fullData }: { data: DirectoryRow[] }) {
  const dispatch = useDispatch()
  const { loggedIn, isMember } = useContext(UserContext)
  const confirm = useConfirm()
  const router = useRouter()
  const userData = useContext(UserContext)

  const handleClick = () => {
    if (!loggedIn) {
      return confirm({
        title: "Please log in",
        description: "Please log in to submit to the directory.", confirmationText: "Log in"
      }).then(() => {
        router.push("/login?redirect_url=/directory")
      })
    } else if (!isMember) {
      return confirm({
        title: "Members only",
        description: "Please get a membership to submit to the directory.", confirmationText: "Membership"
      }).then(() => {
        router.push("/membership")
      })
    } else {
      return router.push("/directory/submit")
    }
  }

  useEffect(() => {
    dispatch(loaded(fullData))
    console.log({ fullData })
  })

  return (<>
    {userData.isMember && <DefaultLayout>
      <div className={css.header}>
        <h1>Directory</h1>
        <p>
          All submissions are subject to review. By submitting to the directory you are agreeing to our <Link href="#">Privacy Policy</Link>.
        </p>
        <Button
          className={css.button}
          onClick={handleClick}>
          Submit to Directory
        </Button>
      </div>
      <div className={css.box}>
        <Directory />
      </div>
    </DefaultLayout >
    }
    {!loggedIn && <>
      <DefaultLayoutCentered>
        <div className={css.header}>
          <h1>Directory</h1>
          < Box>
            <Alert color="warning">
              <AlertTitle><strong>Please Log In</strong></AlertTitle>
              <AlertTitle>
                Please log in to see the directory.
                Log in <Link href="/login?redirect_url=/directory">here</Link>.
              </AlertTitle>
            </Alert>
          </Box>
        </div>
      </DefaultLayoutCentered>
    </>}
    {!userData.isMember && loggedIn && <>
      <DefaultLayoutCentered>
        <div className={css.header}
          style={{
            margin: "0 2vw",
            minWidth: "none",
            width: "20vw !important"
          }}>
          <h1>Directory</h1>
          < Box>
            <Alert color="warning">
              <AlertTitle><strong>Members Only</strong></AlertTitle>
              <AlertTitle>
                You must be a member to see the directory.
                Sign up <Link href="/membership">here</Link>.
              </AlertTitle>
            </Alert>
          </Box>
        </div>
      </DefaultLayoutCentered>
    </>
    }
  </>)
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/api/directory`)
  return {
    props: {
      data,
    },
  }
}
