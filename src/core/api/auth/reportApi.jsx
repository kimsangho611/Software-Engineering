import myAxios, { METHOD } from "../apiController";

export const ReportApi = async (title, contents, productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/auth/report`,
    data: {
      token: localStorage.getItem("accessToken"),
      title: title,
      contents: contents,
      productId: productId,
    },
  });
  return res.data;
};
