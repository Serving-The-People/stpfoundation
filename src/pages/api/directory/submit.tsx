import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"


async function directorySubmit(req: any, res: NextApiResponse) {
  const { body } = req
  const {userId} = req.auth
  console.log({body})
  const client = new PrismaClient();
  await client.contacts.create({data: {...body, display: body.profile ? body.display: true, userId}})
  //await insertDirectoryData(body)
  return res.status(200).json({ message: "inserted succesfully" })
}
export default withAuth(directorySubmit)