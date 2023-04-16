import { ReactNode } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import index from "./DefaultLayout.module.css"

export default function DefaultLayout(props: { children: ReactNode }) {
    const loading = usePageLoader()
    return <div className={index.body}>
        <Header />
        <NavBar />
        <div className={index.subBody}>
            <div className={index.box}>
                {loading && <Loader />}
                {!loading && props.children}
            </div>
        </div>
        <Footer />
    </div>

}