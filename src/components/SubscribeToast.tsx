"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import substack from "@/images/substack.jpeg";
import Cookies from "js-cookie";

const initialState = { email: "" };
const SubscribeToast: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
      Cookies.set("isSubscribed", "true", { expires: 365 });
      setShowToast(false);
      setShowConfirmation(true);
    },
  });
  useEffect(() => {
    const isSubscribed = Cookies.get("isSubscribed") === "true";
    if (!isSubscribed) {
      setTimeout(() => {
        setShowToast(true);
      }, 1300);
    }
  }, []);
  const handleClose = () => {
    setShowToast(false);
  };
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={`center fixed top-[25%] z-50 flex max-w-[75%] flex-col justify-between rounded-lg bg-[#171717f3] p-4 shadow-lg transition-opacity duration-300 ${
          showToast ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Image
          src={substack}
          height={400}
          width={400}
          alt="Logo"
          className="h-auto w-auto self-center rounded-sm"
        />
        <div className="mt-8 flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg tracking-normal text-neutral-300">
              Sign up for our newsletter!
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="ml-4 rounded-md px-2 py-1 text-neutral-300 hover:bg-black focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-blue-500"
          >
            &#x2715;
          </button>
        </div>
        <div className="mt-2 flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Type your email..."
            value={formik.values.email}
            onChange={formik.handleChange}
            className="mb-2 w-full rounded-md bg-neutral-600 px-3 py-1.5 text-neutral-400 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-blue-500"
          />
          {formik.errors.email && (
            <div className="mb-2 w-max text-sm text-red-500">
              {formik.errors.email}
            </div>
          )}
          <button
            type="submit"
            className="w-max rounded-md bg-neutral-950 px-3 py-1.5 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-blue-500"
            disabled={formik.isSubmitting}
          >
            {!formik.isSubmitting && <>Subscribe</>}
            {formik.isSubmitting && (
              <span style={{ paddingRight: 2 }}>
                <FontAwesomeIcon icon={faSpinner} spin />
              </span>
            )}
          </button>
        </div>
      </form>
      {showConfirmation && (
        <div className="center fixed bottom-[3.25rem] z-50 rounded-lg bg-[#171717f3] p-4 shadow-lg transition-opacity duration-300 sm:-mr-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg tracking-normal text-neutral-300">
              You're Subscribed!
            </h3>
            <button
              onClick={handleConfirmationClose}
              className="ml-4 rounded-md px-2 py-1 text-neutral-300 hover:bg-black"
            >
              &#x2715;
            </button>
          </div>
          <p className="mt-2 text-neutral-300">Stay tuned for updates</p>
        </div>
      )}
    </>
  );
};

export default SubscribeToast;
