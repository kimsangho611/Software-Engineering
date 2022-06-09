import myAxios, { METHOD } from "../apiController";

export const GetAllProduct = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/search`,
  });
  return res.data;
};
