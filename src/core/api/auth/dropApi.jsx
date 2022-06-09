import myAxios, { METHOD } from "../apiController";

export const DropApi = async (email, password) => {
  const res = await myAxios({
    method: METHOD.DELETE,
    url: `/auth/drop`,
    data: {
      email: email,
      password: password,
    },
  });
  return res.data;
};
