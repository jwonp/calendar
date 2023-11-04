import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { docId } = req.query;
  res.status(200).json({
    path: `/schedules/user/${docId}`,
    method: req.method,
  });
};
export default handler;
