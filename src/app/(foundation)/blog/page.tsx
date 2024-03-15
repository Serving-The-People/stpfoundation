"use client";

import { Container } from "@/components/Container";
import { Post } from "@/types/substack";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const initialState = { email: "" };

export default function Blog() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  const confirm = useConfirm();
  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Must be a valid email"),
    }),
    initialValues: { ...initialState },

    onSubmit: async (values, helpers) => {
      const response = await axios.post(
        "https://substackapi.com/api/subscribe",
        { email: values.email, domain: "blog.stp.world" }
      );
      helpers.setSubmitting(false);
      helpers.resetForm();
      sessionStorage.setItem("subscribedEmail", values.email);
      setShowConfirmation(true);
    },
  });

  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    axios
      .get("https://substackapi.com/api/feeds/blog.stp.world?limit=12&sort=new")
      .then(({ data }) => {
        setPosts(data);
      });
  }, []);

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  return (
    <>
    <Container className="my-6 w-full max-w-[1000px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 flex items-center space-x-2">
            <div className="flex flex-col">
            <input name="email" className="h-8 rounded-md p-4" value={formik.values.email} onChange={formik.handleChange}/>
            {formik.errors.email && <div className="mt-2 text-red-500 text-sm">{formik.errors.email}</div>}
            </div>
            <button className="mb-auto h-8 bg-[#eaeaea] font-sans font-normal text-[#4a4d50] hover:bg-[#d4d4d4] px-4 py-3 flex flex-col items-center justify-center rounded-md" disabled={formik.isSubmitting}
            type="submit">{!formik.isSubmitting && <>Subscribe</>}
            {formik.isSubmitting && (
              <span style={{ paddingRight: 2 }}>
                <FontAwesomeIcon icon={faSpinner} spin />
              </span>
            )}</button>
        </div>
      </form>
      <div ref={embedRef} id="custom-substack-embed"></div>
      {posts?.map((post) => {
        return (
          <>
            <div
              className="max-w-[800px]"
              style={{
                lineHeight: "25px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <Link href={post.canonical_url} target="_blank">
                <Grid container className="flex justify-between">
                  <Grid item xs={12} sm={6}>
                    <div
                      className="mr-4 mt-3 h-full max-h-[500px] w-[100%] aspect-square mdMobileX:mr-0 smMuiMobileX:h-[60vh]"
                      style={{
                        backgroundImage: `url(${post.cover_image})`,
                        boxShadow:
                          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50%",
                        backgroundSize: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <div className="mt-4">{post.title}</div>
                    <div>{post.subtitle}</div>
                    <div>
                      <ul className="flex list-none text-[0.8em]">
                        <li className="py-[10px] pr-[10px] uppercase">
                          <p className="mt-[-3px]"> {post.post_date}</p>
                        </li>
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </Link>
            </div>
          </>
        );
      })}
      <p className="my-4 font-sans">
        See more at{" "}
        <Link
          target="webapp_tab"
          className="text-blue-600 hover:text-indigo-600 hover:underline"
          href="https://blog.stp.world"
        >
          blog.stp.world
        </Link>
        .
      </p>
    </Container>      
    {showConfirmation && (
        <div className="fixed bottom-4 left-4 z-50 rounded-lg bg-[#fffffff3] p-4 shadow-lg transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-lg tracking-normal text-neutral-900">
              You're Subscribed!
            </h3>
            <button
              onClick={handleConfirmationClose}
              className="ml-4 rounded-md hover:bg-neutral-200 px-2 py-1 text-neutral-900"
            >
              &#x2715;
            </button>
          </div>
          <p className="mt-2 text-neutral-900">
            Stay tuned for updates
          </p>
        </div>
      )}
      </>
  );
}