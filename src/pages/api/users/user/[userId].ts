import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT, getToken } from "next-auth/jwt";
import { Error } from "@/types/types";
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { userId } = req.query;

  const result = await AxiosWithAuthorization(
    req,
    `/users/user/${userId}`,
    methods.GET
  );

  if (Math.floor(result.status / 100) >= 4) {
    const error: Error = {
      message: "해당 요청 중 오류가 발생했습니다.",
    };
    res.status(result.status).json(error);
  }
  res.status(200).json(result);
};
export default handler;
