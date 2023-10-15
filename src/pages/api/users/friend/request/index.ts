import { FriendRequest, RequestReply } from "@/types/dto";
import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === methods.POST) {
    const friendRequest: FriendRequest = req.body as FriendRequest;
    const result = AxiosWithAuthorization(
      req,
      "/users/friend/request",
      methods.POST,
      friendRequest
    );
    return res.status(200).json(result);
  }
  if (req.method === methods.PATCH) {
    const reply: RequestReply = req.body as RequestReply;
    const result = AxiosWithAuthorization(
      req,
      "/users/friend/request",
      methods.PATCH,
      reply
    );
    return res.status(200).json(result);
  }
};
export default handler;
