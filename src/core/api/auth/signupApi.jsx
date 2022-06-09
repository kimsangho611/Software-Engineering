import myAxios, { METHOD } from "../apiController";
export const SignupApi = async (type, email, password, name, phone) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/auth/signup/`,
    data: {
      email: email,
      password: password,
      name: name,
      phone: phone,
    },
  });
  return res.data;
};
