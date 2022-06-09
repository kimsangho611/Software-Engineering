import myAxios, { METHOD } from "../apiController";
export const GetCategoryListApi = async (
  orderBy,
  min,
  max,
  bigCategory,
  smallCategory
) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/product/list`,
    params: {
      orderBy: orderBy,
      min: min,
      max: max,
      bigCategory: bigCategory,
      smallCategory: smallCategory,
    },
  });
  return res.data;
};
