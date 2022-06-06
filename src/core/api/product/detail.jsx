import myAxios, { METHOD } from "../apiController";
export const getProductDetail = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: "/product/detail",
    data: { productId: productId },
  });
  return res.data;
};
