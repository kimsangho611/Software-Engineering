import myAxios, { METHOD } from "../apiController";
export const getSellerInfo = async (productId) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/user/detailInfo`,
    data: { productId: productId },
  });
  return res.data;
};
