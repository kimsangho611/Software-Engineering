import myAxios, { METHOD } from "../apiController";
export const chargePoint = async (amount) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/point/charge`,
    data: { pointAmount: amount },
  });
  return res.status;
};
