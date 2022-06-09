import myAxios, { METHOD } from "../apiController";
export const productRegister = async (userInput) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/product/upload`,
    data: userInput,
  });
  return res;
};
