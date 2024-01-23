"use client";

import PostForm from "@/tempname/chan/posts/PostForm";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

export default function BoardsShow() {
  const { slug } = useParams();

  return (
    <>
      <div className="ml-[-2vw] mt-[-18px] flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-black p-5 text-sm font-bold sm:flex-row">
        <p className="pb-1 sm:pb-0 sm:pr-4">Create a post</p>
        <div className="min-w-max"></div>
      </div>
      <div className="py-5">
        <PostForm slug={slug as string} />
      </div>
    </>
  );
}
