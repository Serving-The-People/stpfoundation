import { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

import css from "./Loader.module.css"
import { useSideNav } from "../Nav/NavContext";

export default function Loader() {

  const { sideNavVisible } = useSideNav();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const loadingStyle: CSSProperties = {
    overflowX: "hidden",
    width:
      sideNavVisible
        ? "calc(100vw - 130px)"
        : windowWidth && windowWidth <= 450
          ? "100vw"
          : "",
  };
  return (
    <div className={css.wrapper}>
      <h2 className={css.loading} style={loadingStyle}>Loading</h2>
    </div>
  )
}