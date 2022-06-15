import myAxios, { METHOD } from "../apiController";

export const BuyConfirm = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/mypage/list/buy/${productId}`,
  });
  return res.data;
};

export const SellConfirm = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/mypage/list/sell/${productId}`,
  });
  return res.data;
};
