import myAxios, { METHOD } from "../apiController";

export const GetNoticeList = async () => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/notice/list`,
  });
  return res.data;
};

export const GetNoticeDetail = async (noticeId) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/notice/detail`,
    params: {
      noticeId: noticeId,
    },
  });
  return res.data;
};

export const UploadNotice = async (title, contents) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/notice/upload`,
    data: {
      title: title,
      contents: contents,
    },
  });
  return res.data;
};

export const GetEditNoticeDetail = async (noticeId) => {
  const res = await myAxios({
    method: METHOD.GET,
    url: `/notice/edit`,
    params: {
      noticeId: noticeId,
    },
  });
  return res.data;
};

export const EditNotice = async (noticeId, title, contents) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/notice/${noticeId}/edit`,
    data: {
      title: title,
      contents: contents,
    },
  });
  return res.data;
};

export const DeleteNotice = async (noticeId) => {
  const res = await myAxios({
    method: METHOD.DELETE,
    url: `/notice/${noticeId}/delete`,
  });
  return res.data;
};
