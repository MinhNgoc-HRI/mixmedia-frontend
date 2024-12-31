import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Country } from "@prisma/client";
import { formatResponse } from "@/utils/response";
import { logger } from "@/utils/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const countries: Country[] = await prisma.country.findMany();
        return res.status(200).json(formatResponse(true, "success", countries));
      } catch (error) {
        logger.error("Lấy danh sách countries thất bại", error);
        return res
          .status(500)
          .json(formatResponse(false, "Đã có lỗi xảy ra", null));
      }
    }
    default:
      res
        .status(405)
        .json(formatResponse(false, `Method ${method} Not Allowed`, null));
  }
}
