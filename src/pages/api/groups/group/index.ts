import { Group, GroupDeleteRequest } from "@/types/dto";
import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === methods.POST) {
    const newGroup = req.body as Group;
    const result = await AxiosWithAuthorization(
      req,
      "/groups/group",
      methods.POST,
      newGroup
    );
    return res
      .status(Object.keys(result).includes("docId") ? 200 : 400)
      .json(result);
  }
  if (req.method === methods.DELETE) {
    const deleteRequest: GroupDeleteRequest = req.body as GroupDeleteRequest;
    const result = await AxiosWithAuthorization(
      req,
      "/groups/group",
      methods.DELETE,
      deleteRequest
    );
    return res.status(result ? 200 : 400).json(result);
  }
};
export default handler;
