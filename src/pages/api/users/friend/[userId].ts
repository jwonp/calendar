import { Friend } from "@/types/dto";
import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { userId } = req.query;
  const result: Friend[] = await AxiosWithAuthorization(
    req,
    `/users/friend/${userId}`,
    methods.GET
  );

  res.status(200).json(result ?? []);
};
export default handler;
