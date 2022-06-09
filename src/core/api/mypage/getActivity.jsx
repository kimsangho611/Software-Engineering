import myAxios, { METHOD } from "../apiController";
export const GetActivityApi = async (type) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/mypage/list/activity`,
    params: {
      type: type,
    },
  });
  return res.data;
};
