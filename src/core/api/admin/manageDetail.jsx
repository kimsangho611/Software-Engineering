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
