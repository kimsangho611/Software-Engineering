import myAxios, { METHOD } from "../apiController";
export const getUserLists = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/user/list`,
  });
  return res;
};

export const getReportLists = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/report/list`,
  });
  return res;
};

export const getInquiryLists = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/inquire/list`,
  });
  return res;
};

export const getNoticeLists = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/notice/list`,
  });
  return res;
};
