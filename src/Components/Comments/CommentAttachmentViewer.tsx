import React, { useEffect, useState } from "react";

interface CommentAttachmentViewerProps {
  attachments: any[];
}

const CommentAttachmentViewer: React.FC<CommentAttachmentViewerProps> = ({
  attachments,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [expandedImages, setExpandedImages] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 570);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 570) {
        setIsMobile(true);
        setExpandedImages([]);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleExpanded = (index: number) => {
    if (!isMobile && expandedImages.includes(index)) {
      setExpandedImages(expandedImages.filter((i) => i !== index));
    } else if (!isMobile) {
      setExpandedImages([...expandedImages, index]);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const visibleAttachments = attachments
    ? showAll
      ? attachments
      : [attachments[0]]
    : [];

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 pt-1 mdMobileX:flex-col">
        {visibleAttachments.map((attachment, index) => {
          return attachment ? (
            <div className="flex flex-col">
              <div
                key={index}
                className="relative flex w-max flex-col"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <img
                  style={{
                    maxWidth: expandedImages.includes(index)
                      ? "calc(100vw - 5.5rem)"
                      : "300px",
                  }}
                  className="max-h-[50vh]"
                  src={attachment.url}
                />
                {!isMobile && hoveredIndex === index && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="absolute right-1 top-1 rounded-md bg-[#eff0f0] p-1"
                  >
                    {expandedImages.includes(index) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#4a4d50"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.strokeWidth = "1.5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.strokeWidth = "1")
                        }
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#4a4d50"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.strokeWidth = "1.5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.strokeWidth = "1")
                        }
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
              <div>
                <ul
                  className={`scrollbar-hide flex w-fit max-w-[95vw] flex-row overflow-x-auto pt-2`}
                >
                  <li
                    className={`h-4 w-max self-center border-[0] border-r-[1px] border-solid border-black pr-1 text-xs mdMobileX:hidden`}
                  >
                    {attachment.width}&nbsp;x&nbsp;{attachment?.height}&nbsp;
                  </li>
                  <li
                    className={`h-4 min-w-max self-center border-[0] border-r-[1px] border-solid border-black px-1 text-xs mdMobileX:hidden`}
                  >
                    {formatBytes(parseInt(attachment.size))}
                  </li>
                  <li className="h-4 w-max self-center px-1 text-xs mdMobileX:px-0">
                    <a
                      href={attachment?.url}
                      className="text-blue-600 underline hover:text-indigo-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment.filename}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : null;
        })}
      </div>
      {attachments?.length > 1 && !showAll && (
        <button
          className={`w-15 mt-2 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs`}
          onClick={() => setShowAll(true)}
        >
          Show {attachments.length - 1} more images
        </button>
      )}
      {attachments?.length > 1 && showAll && (
        <button
          className={`w-15 mt-2 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs`}
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </>
  );
};

export default CommentAttachmentViewer;
