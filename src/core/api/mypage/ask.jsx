import myAxios, { METHOD } from "../apiController";
export const getAskList = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/oneToOneInquiry`,
  });
  return res.data;
};

export const askOneToOne = async (askData) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/oneToOneInquiry`,
    data: askData,
  });
  return res.data;
};
