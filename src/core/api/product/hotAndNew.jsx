import myAxios, { METHOD } from "../apiController";

export const HotAndNew = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/main/list`,
  });
  return res.data;
};
