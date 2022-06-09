import myAxios, { METHOD } from "../apiController";
export const hit = async (productId) => {
  return await myAxios({
    method: METHOD.POST,
    url: "/product/hit",
    data: { productId: productId },
  });
};
