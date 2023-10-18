import axios from "axios";
export const UrlBuilder = (url: string, condition?: boolean) => {
  if (condition) {
    return condition ? url : null;
  }
  return url;
};
export const DefaultFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

