import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { prisma } from "../../../utils/prisma"

export default async function resourcesIndex(req: NextApiRequest, res: NextApiResponse) {

    const data = await prisma.resource.findMany({
        where: {},
        orderBy: { name: "asc" }
    })

    return res.status(200).json(data)
}