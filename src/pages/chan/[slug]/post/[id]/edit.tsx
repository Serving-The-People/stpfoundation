import { Boards, Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import DefaultLayout from "../../../../../Components/Layouts/DefaultLayout";
import PostDeleteButton from "../../../../../Components/Posts/PostDeleteButton";
import PostForm from "../../../../../Components/Posts/PostForm";
import { getBoard, getPost } from "../../../../../utils/services";
import { PostResponse } from "../../../../../types";
import { useAuth } from "@clerk/nextjs";
import { UserContext } from "../../../../../Components/UserContext";

export default function PostEditPage() {
  const { userId } = useAuth();
  const userData = useContext(UserContext);
  const router = useRouter();
  const { id, slug } = router.query;
  const [post, setPost] = useState<PostResponse | null>(null);
  const [board, setBoard] = useState<Boards | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    if (id && slug) {
      setIsLoading(true);
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
        setIsLoading(false);
      });

      getBoard(slug as string).then((data) => setBoard(data));
    }
  }, [id, slug]);

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowCookieBanner(true);
  };

  const handleYes = () => {
    router.back();
  };

  const handleNo = () => {
    setShowCookieBanner(false);
  };

  if (isLoading) {
    return (
      <DefaultLayout>
        <p className="my-2">Loading...</p>
      </DefaultLayout>
    );
  }

  if (!post) {
    return (
      <DefaultLayout>
        <p>Error: Post data not loaded.</p>
      </DefaultLayout>
    );
  }

  console.log(post.userId, userId);

  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout>
        {post.isAuthor ? (
          <>
            <p className="my-2">
              <Link
                className="font-black hover:underline"
                href="#"
                onClick={handleBackClick}
              >
                <button
                  type="submit"
                  color="rgb(239, 240, 240)"
                  className="w-15 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
                >
                  Back
                </button>
              </Link>
            </p>
            {showCookieBanner && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-min-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
                  <p className="text-center font-sans text-lg font-bold leading-6 text-gray-900">
                    Are you sure you want to leave?
                  </p>
                  <p className="text-center font-sans text-sm font-bold leading-6 text-gray-500">
                    Remember to save changes.
                  </p>
                  <div className="flex place-content-center gap-x-2">
                    <button
                      type="button"
                      className="w-15 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
                      onClick={handleYes}
                    >
                      Leave
                    </button>
                    <button
                      type="button"
                      className="w-15 float-right mt-2 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
                      onClick={handleNo}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <PostForm post={post} slug={slug as string} />
              <div className="mb-2 w-full max-w-[500px] self-center">
                <PostDeleteButton
                  postId={post.id}
                  onComplete={() => router.push("/chan")}
                >
                  Delete Post
                </PostDeleteButton>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4 border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#f3ce49"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-sans text-sm text-yellow-700">
                  You do not have permission to edit this post.
                </p>
              </div>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}
