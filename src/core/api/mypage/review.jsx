import myAxios, { METHOD } from "../apiController";
export const writeReview = async (productId, review) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/review/product/${productId}`,
    data: review,
  });
  return res.data;
};

export const getSellerReview = async (productId) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/review/seller/${productId}`,
  });
  console.log("res in api", res);
  return res.data;
};
