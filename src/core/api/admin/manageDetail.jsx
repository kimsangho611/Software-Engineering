import myAxios, { METHOD } from "../apiController";
export const getReportDetail = async (reportId) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/report/${reportId}/detail`,
  });
  return res;
};

export const reportUser = async (reportId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/report/${reportId}/stopId`,
  });
  return res.status;
};

export const ignoreReport = async (reportId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/report/${reportId}/ignore`,
  });
  return res.status;
};

export const getInquiryDetail = async (inquiryId) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/inquire/${inquiryId}/detail`,
  });
  return res.data;
};

export const writeAnswerToInquiry = async (inquiryId, answer) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/inquire/${inquiryId}/upload`,
    data: { answer: answer },
  });
  return res.status;
};
