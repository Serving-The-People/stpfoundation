import { useUser } from "@clerk/clerk-react";
import { ButtonProps } from "@mui/material";
import { useSnackbar } from "notistack";
import { deletePost } from "../../utils/services";
import { useState } from "react";

export default function PostDeleteButton(
  props: Omit<ButtonProps, "onClick"> & {
    onComplete?: () => void;
    postId: number;
  }
) {
  const { onComplete, postId, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClick = () => {
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    deletePost("<slug>", postId)
      .then(() => {
        console.log("Completing onComplete action");
        onComplete && onComplete();
        enqueueSnackbar({ message: "Deleted post!", variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar({ message: "Couldn't Delete Post", variant: "error" });
      });
    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      {user && (
        <button
          type="submit"
          className="w-15 relative h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
          {...rest}
          onClick={handleClick}
        >
          Delete Post
        </button>
      )}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-min-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
            <p className="text-center text-lg font-bold leading-6 text-gray-900">
              Are you sure you want to delete?
            </p>
            <div className="flex place-content-center gap-x-2">
              <button
                type="button"
                className="w-15 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
                onClick={handleDelete}
              >
                Yes, delete
              </button>
              <button
                type="button"
                className="w-15 float-right mt-2 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
