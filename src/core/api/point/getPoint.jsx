import myAxios, { METHOD } from "../apiController";
export const getPoint = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/point/now`,
  });
  return res.data;
};

export const getPointList = async () => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/point/list`,
  });
  return res.data;
};
