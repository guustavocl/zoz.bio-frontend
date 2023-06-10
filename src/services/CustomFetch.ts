const API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://127.0.0.1:3100";

const appendParams = (params: Record<string, string | number | boolean>) => {
  return (
    "?" +
    Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&")
  );
};

export const serverSideGet = (endpoint: string, params = {}, revalidate = 10) => {
  return fetch(`${API_URL}/${endpoint}${params ? appendParams(params) : ""}`, {
    next: {
      revalidate: revalidate,
    },
  });
};
