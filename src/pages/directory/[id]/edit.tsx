import Link from "next/link"
import DirectoryForm from "../../../Components/Directory/DirectoryForm"
import css from "src/styles/Submit.module.css"
import AuthLayout from "../../../Components/Layouts/AuthLayout"
import { useContext } from "react"
import { UserContext } from "../../../Components/UserContext"
import { Box } from "@mui/system"
import { Alert, AlertTitle } from "@mui/material"
import { useRouter } from "next/router"
import { useContact } from "../../../redux/hooks"
import DeleteButton from "../../../Components/Directory/DeleteButton"
export default function DirectorySubmit() {
    const userData = useContext(UserContext)
    const router = useRouter()
    const { id } = router.query

    const contact = useContact(id as string)

    return (
        <AuthLayout>
            <div className={css.wrapper}>
                <div className={css.box}>
                    <h1>Edit Directory Entry</h1>
                </div>
                {userData.isMember && <DirectoryForm data={contact} profile={false} />}
                <DeleteButton id={id as string} after={() => {
                    router.push("/directory")
                }} />
                {!userData.isMember && < Box>
                    <Alert color="warning">
                        <AlertTitle><strong>Members Only</strong></AlertTitle>
                        <AlertTitle>
                            You must be a member to submit to the directory.
                            Sign up <Link href="/membership">here</Link>.
                        </AlertTitle>
                    </Alert>
                </Box>}

            </div>
        </AuthLayout>
    )
}
