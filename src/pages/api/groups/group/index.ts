import { Group } from "@/types/dto";
import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const newGroup = req.body as Group;
  const result = await AxiosWithAuthorization(
    req,
    "/groups/group",
    methods.POST,
    newGroup
  );
  res.status(Object.keys(result).includes("docId") ? 200 : 400).json(result);
};
export default handler;
