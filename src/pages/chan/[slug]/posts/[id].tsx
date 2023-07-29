import { Boards } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Comments from "../../../../Components/Comments";
import CommentForm from "../../../../Components/Comments/CommentForm";
import DefaultLayout from "../../../../Components/Layouts/DefaultLayout";
import { PostResponse } from "../../../../types";
import linkify from "../../../../utils/linkify";
import { getBoard, getPost } from "../../../../utils/services";

export default function PostViewPage() {
  const router = useRouter();
  const { id, slug } = router.query;
  const stringSlug = Array.isArray(slug) ? slug[0] : slug || "defaultSlug";

  const [post, setPost] = useState<PostResponse>();
  const [board, setBoard] = useState<Boards>();

  const [uploadDetails, setUploadDetails] = useState<{
    filename: string;
    size: string;
    height: string;
    width: string;
    url: string;
  } | null>();

  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [isAttachmentInfoVisible, setIsAttachmentInfoVisible] = useState(true);

  const [version, setVersion] = useState(1);

  // Fetch post and upload details
  useEffect(() => {
    if (id) {
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
        setUploadDetails(data?.uploadDetails! as any);
      });
    }
  }, [id]);

  // Fetch board details
  useEffect(() => {
    if (slug) {
      getBoard(slug as string).then((data) => setBoard(data));
    }
  }, [slug]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const windowHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const reachedBottom = scrollTop + windowHeight >= scrollHeight;
      setIsAtBottom(reachedBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Loading state
  if (!post) {
    return (
      <DefaultLayout>
        <p className="my-2">Loading...</p>
      </DefaultLayout>
    );
  }

  // Helper functions
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleImageClick = () => {
    setIsAttachmentInfoVisible(!isAttachmentInfoVisible);
  };

  // Data processing
  const postSlug = board?.slug || "all";
  const postContent = linkify(post?.content ?? "");
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout>
        <div
          className="sticky top-0 z-50 flex justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] py-1 text-sm font-bold"
          style={{ width: "calc(100vw - 2rem)" }}
        >
          <Link
            className="font-black hover:underline"
            href={`/chan/${postSlug}`}
          >
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className="w-15 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
            >
              Back
            </button>
          </Link>
          {post.isAuthor ? (
            <Link href={`/chan/${postSlug}/posts/${post.id}/edit`}>
              <button
                type="submit"
                color="rgb(239, 240, 240)"
                className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
              >
                Edit
              </button>
            </Link>
          ) : null}
          <Link
            className="hover:underline"
            href="javascript:void(0);"
            onClick={isAtBottom ? scrollToTop : scrollToBottom}
          >
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
            >
              {isAtBottom ? "Top" : "Bottom"}
            </button>
          </Link>
        </div>
        <div className="mx-1 flex flex-col items-center text-center">
          <div className="mb-2 max-w-[1000px]">
            <h1 className="mt-4 font-sans text-lg font-bold">{post.title}</h1>
            <div
              className="scrollbar-hide mt-2 overflow-x-auto overflow-y-hidden font-sans"
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
            {post.attachment && (
              <div className="flex flex-col items-center">
                <img
                  className={`${
                    isAttachmentInfoVisible ? "max-h-[50vh]" : "hidden"
                  }  pb-2 pt-4 hover:cursor-pointer`}
                  src={post.attachment}
                  onClick={handleImageClick}
                />
                {isAttachmentInfoVisible && uploadDetails && (
                  <ul className="scrollbar-hide mt-1 flex max-w-[80vw]  flex-row overflow-x-auto overflow-y-hidden mdMobileX:text-xs [&>li]:h-4 [&>li]:self-center [&>li]:text-gray-600">
                    <li className="border-[0] border-r-[1px] border-solid border-black pr-1">
                      {uploadDetails?.width}
                      &nbsp;x&nbsp;
                      {uploadDetails?.height}
                      &nbsp;
                    </li>
                    <li className="min-w-max border-[0] border-r-[1px] border-solid border-black px-1">
                      {formatBytes(parseInt(uploadDetails?.size))}
                    </li>
                    <li className="px-1">
                      <a
                        href={uploadDetails?.url}
                        className="text-blue-600 underline hover:text-indigo-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {uploadDetails?.filename}
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            )}
            {!isAttachmentInfoVisible && uploadDetails && (
              <div className="mt-2">
                <Link
                  href="#"
                  onClick={handleImageClick}
                  className="hover:underline"
                >
                  [Show Image]
                </Link>
              </div>
            )}
            <div className="relative mt-8 flex flex-row py-0.5 pt-2 text-xs leading-5 text-gray-500">
              <div className="absolute -bottom-2 left-0 top-0 flex w-6 justify-center">
                <div className="w-px bg-slate-200" />
              </div>
              <img
                src={post.user?.profileImageUrl || "/favicon.ico"}
                alt=""
                className="relative mt-[5px] h-6 w-6 flex-none rounded-full bg-gray-50"
              />
              <div className="mb-[-2px] ml-4 flex overflow-auto rounded-md bg-[#dbddffa5] p-2">
                <span className="min-w-max self-center font-sans font-medium text-gray-900">
                  {post.user?.firstName || post.user?.lastName
                    ? `${post.user?.firstName} ${post.user?.lastName}`
                    : "Anonymous"}
                </span>
                <p className="min-w-max self-center font-sans text-gray-500">
                  {" "}
                  &nbsp;posted @&nbsp;
                </p>
                <time
                  dateTime={
                    post.createdAt ? new Date(post.createdAt).toISOString() : ""
                  }
                  className="min-w-max self-center text-gray-500"
                >
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : ""}
                </time>
              </div>
            </div>
            <div className="ml-[-10px] mt-2 text-left">
              <Comments
                thread={true}
                reverseOrder
                key={version}
                id={Number(id)}
                slug={stringSlug}
                postId={post.id}
              />
            </div>
            <CommentForm
              onComplete={() => setVersion((v) => v + 1)}
              id={Number(id)}
            />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}
