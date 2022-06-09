import myAxios, { METHOD } from "../apiController";
export const getBuyList = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: "/mypage/list/buy",
  });
  return res.data;
};

export const getSellList = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: "/mypage/list/sell",
  });
  return res.data;
};

// export const getActivityList = async (productId) => {
//     const res = await myAxios({
//       method: METHOD.GET,
//       url: "/mypage/list/buy",
//     });
//     return res.data;
//   };
