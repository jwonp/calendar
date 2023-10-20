import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { docId } = req.query;
  const result = await AxiosWithAuthorization(
    req,
    `/groups/group/${docId}`,
    methods.GET
  );
  res.status(200).json(result);
};
export default handler;
