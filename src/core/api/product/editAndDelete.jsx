import myAxios, { METHOD } from "../apiController";

export const ProductEdit = async (detail) => {
  console.log("detail", detail);
  const res = await myAxios({
    method: METHOD.POST,
    url: "/product/edit",
    data: {
      detail,
    },
  });
  return res.data;
};

export const ProductDelete = async (id) => {
  const res = await myAxios({
    method: METHOD.DELETE,
    url: "/product/delete",
    params: {
      id: id,
    },
  });
  return res.data;
};
