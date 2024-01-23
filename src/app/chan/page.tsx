import React from "react";
import BoardComponent from "../../tempname/chan/boards/BoardComponent";

export default function BoardsIndexPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BoardComponent />;
}
