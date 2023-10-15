import { Schedule } from "@/types/dto";
import { AxiosWithAuthorization, Method, methods } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const url = "/schedules/user";
  const schedule = req.body as Schedule;
  let method: Method = methods.POST;

  if (req.method === methods.PATCH) {
    method = methods.PATCH;
  }
  const result = await AxiosWithAuthorization(req, url, method, schedule);

  res.status(200).json(result);
};
export default handler;
