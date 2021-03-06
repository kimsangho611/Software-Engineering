import myAxios, { METHOD } from "../apiController";
export const getProductDetail = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: "/product/detail",
    data: { productId: productId },
  });
  return res.data;
};

export const amISeller = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: "/product/amISeller",
    data: { productId: productId },
  });
  return res;
};
