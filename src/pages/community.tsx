import React from "react"
import Button from "@mui/material/Button"

import css from "../styles/Discussion.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const Discussion = () => {
    return (
        <DefaultLayout>
            <div className={css.wrapper}>
               <h1>Whatsapp</h1>
                <p>
                    Our Whatsapp group is where we vote on topics and discuss details pertaining to the weekly community meetings.
                </p>
                <Button className={css.button} target="_blank" variant="contained" href="https://chat.whatsapp.com/Bqtf9Q2hhQw96RCHpuMPLm">
                    Join the group
                </Button>
                <h1>Discord</h1>
                <p>
                    The Serving the People Discord is where our community gathers to discuss and chat. It features a diverse selection of channels, including art, film, video, tech, and more.
                </p>
                <Button className={css.button} target="_blank" variant="contained" href="https://discord.com/invite/nhqyng5wQ9">
                    Join the Conversation
                </Button>
                <h1>Urbit</h1>
                <p>
                    Urbit is a new OS and peer-to-peer network that is designed to be simple, built to last forever, and 100% owned by its users. Urbit's Landscape, a collection of native apps for communicating and collaborating on the network, presents the possibility of a new way forward.
                </p>
                <p>
                    Serving the People has partnered with the Tlon Corporation to offer free hosting (usually $20/month) to members of Serving the People. Join us and a cohort of communities making the move to Urbit's Landscape.
                </p>
                <Button className={css.button} target="_blank" variant="contained" href="https://tlon.network/lure/~hodpel-witdyr/serving-the-people">
                    Learn More
                </Button>
            </div>
        </DefaultLayout>
    )
}

export default Discussion