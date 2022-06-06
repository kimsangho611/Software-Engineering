import myAxios, { METHOD } from "../apiController";
export const productLike = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/likeItem`,
    data: { productId: productId },
  });
  return res.data;
};
