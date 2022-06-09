import myAxios, { METHOD } from "../apiController";

export const EditInfoApi = async (email, oldpw, newpw, name, phone) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/auth/editInfo`,
    data: {
      token: localStorage.getItem("accessToken"),
      email: email,
      oldpw: oldpw,
      newpw: newpw,
      name: name,
      phone: phone,
    },
  });
  return res.data;
};
