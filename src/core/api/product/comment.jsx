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
  return res.data;
};

export const writeCommentAsSeller = async (productId, qnaId, comment) => {
  const res = await myAxios({
    method: METHOD.POST,
    url: `/product/${productId}/qna/${qnaId}`,
    data: { answer: comment },
  });
  return res.data;
};
