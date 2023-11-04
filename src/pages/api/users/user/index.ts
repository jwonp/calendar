import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({
    path: `/users/user`,
    method: req.method,
  });
};
export default handler;