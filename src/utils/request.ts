import axios, { AxiosError } from "axios";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
export const methods = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;
export type Method = (typeof methods)[keyof typeof methods];
const getAccessToken = async (req: NextApiRequest) => {
  const token = await getToken({ req });
  
  console.log(token);
  return token;
};
export const AxiosWithAuthorization = async (
  req: NextApiRequest,
  url: string,
  method: Method,
  data?: any
) => {
  const authorization = await getAccessToken(req);

  return await axios(`${process.env.BACKEND_END_POINT}${url}`, {
    data: data,
    method: method,
    headers: {
      Authorization: `Bearer ${authorization?.accessToken as string}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {

      return { status: err.status, message: err.cause?.message };
    });
};
