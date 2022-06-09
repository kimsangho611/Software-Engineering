import myAxios, { METHOD } from "../apiController";
export const LoginApi = async (type, email, password) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/auth/login/${type}`,
    data: {
      email: email,
      password: password,
    },
  });
  console.log("res=", res);
  return res.data;
};
