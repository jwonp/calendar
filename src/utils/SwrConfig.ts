import axios, { AxiosError } from "axios";
export const UrlBuilder = (url: string, condition: boolean) => {
  const isNoParams = url.includes("//") || url.includes("undefined");
  if (condition === true && isNoParams === false) {
    return condition ? url : null;
  }
  return null;
};
export const DefaultFetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.status);
    });
