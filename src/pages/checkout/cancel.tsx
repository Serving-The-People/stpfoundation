import Link from "next/link";

import css from "../../styles/Contact.module.css"
import DefaultLayoutCentered from "../../Components/Layouts/DefaultLayoutCentered";

export default function checkoutCancel() {
    return (
        <DefaultLayoutCentered>
            <div className={css.box}>
                <h1>Payment cancelled.</h1>
                <p>You can try again <Link href="/membership">here</Link></p>
            </div>
        </DefaultLayoutCentered>
    )
}