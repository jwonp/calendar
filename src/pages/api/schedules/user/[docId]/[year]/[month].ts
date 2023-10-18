import { Schedule } from "@/types/dao";
import { AxiosWithAuthorization, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { docId, year, month } = req.query;
  const result: Schedule[] = await AxiosWithAuthorization(
    req,
    `/schedules/user/${docId}/${year}/${month}`,
    methods.GET
  );

  res.status(200).json(result);
};

export default handler;
