/* Using fetch cause Next.js 13 server side cache options don't work with axios yet */
export const API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

const appendParams = (params: Record<string, string | number | boolean>) => {
  return (
    "?" +
    Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&")
  );
};

export const serverSideGet = (endpoint: string, params = {}, options = {}, cookies = "") => {
  return fetch(`${API_URL}/${endpoint}${params ? appendParams(params) : ""}`, {
    next: options,
    headers: {
      Cookie: cookies,
    },
  });
};
