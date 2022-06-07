import myAxios, { METHOD } from "../apiController";
export const getPoint = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/point/now`,
  });
  return res.data;
};
