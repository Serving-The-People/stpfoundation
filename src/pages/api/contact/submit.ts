import { NextApiResponse } from "next"
import { withAuth } from "@clerk/nextjs/api"
import { PrismaClient } from "@prisma/client"

export default withAuth(async (req: any, res: NextApiResponse) => {
  const { body } = req

  const client = new PrismaClient()
  await client.events.create({ data: { ...body, starts_at: new Date(body.starts_at), ends_at: body.ends_at === '' ? undefined : new Date(body.ends_at), userId: req.auth.userId, display: body.profile ? body.display : true, profile: !!body.profile } })
  return res.status(200).json({ message: "inserted succesfully" })
})