import { clerkClient, withAuth } from "@clerk/nextjs/api";
import { NextApiResponse } from "next";
import { moderate } from "../../../../../utils/openai";
import { prisma } from "../../../../../utils/prisma";

export async function postGet(req: any, res: NextApiResponse) {
  const data = await prisma.post.findFirstOrThrow({
    where: { id: Number(req.query.id) },
  });
  if (req.method === "GET") {
    const user = await clerkClient.users.getUser(data.userId);
    const { firstName, lastName, profileImageUrl } = user;

    return res
      .status(200)
      .json({ ...data, user: { firstName, lastName, profileImageUrl } });
  } else if (req.method === "PUT") {
    const body = req.body;

    let result = await moderate(body.content!);

    if (result.flagged) {
      return res.status(400).json({ message: "Inappropriate comment" });
    }

    result = await moderate(body.title!);

    if (result.flagged) {
      return res.status(400).json({ message: "Inappropriate title" });
    }

    const dataNew = await prisma.post.update({
      where: { id: data.id },
      data: { ...data, ...body },
    });

    return res.status(200).json(dataNew);
  } else if (req.method === "DELETE") {
    if (!data.userId || req.auth.userId !== data.userId)
      return res
        .status(400)
        .json({ message: "Invalid user. You can only delete your own post" });
    await prisma.post.delete({ where: { id: Number(req.query.id) } });
    return res.status(200).json({ message: "Deleted" });
  }
}

export default withAuth(postGet);
