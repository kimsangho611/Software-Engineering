import myAxios, { METHOD } from "../apiController";
export const getComments = async (productId) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/product/${productId}/qna/list`,
  });
  return res.data;
};

export const writeCommentAsBuyer = async (productId, comment) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/product/${productId}/qna`,
    data: { question: comment },
  });
  return res.status;
};

export const writeCommentAsSeller = async (productInquiryId, comment) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/product/${productInquiryId}/answer`,
    data: { answer: comment },
  });
  return res.status;
};
