import { User } from "@/types/dao";
import { Friend } from "@/types/dto";
import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { email } = req.query;
  const result: Omit<User, "friends" | "docId">[] =
    await AxiosWithAuthorization(
      req,
      `/users/friend/search/${email}`,
      methods.GET
    );

  res.status(200).json(result ?? []);
};
export default handler;
