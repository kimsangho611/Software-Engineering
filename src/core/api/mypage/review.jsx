import myAxios, { METHOD } from "../apiController";
export const writeReview = async (productId, review) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/review/product/${productId}`,
    data: review,
  });
  return res.data;
};
