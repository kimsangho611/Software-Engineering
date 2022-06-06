import myAxios, { METHOD } from "../apiController";
export const buyWithPoint = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/point/buy`,
    data: { productId: productId },
  });
  return res.data;
};
