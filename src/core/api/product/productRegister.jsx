import DataURIToBlob from "../../../utils/dataURItoBlob";

export const productRegister = async (userInput) => {
  let formData = new FormData();
  formData.append("file", DataURIToBlob(userInput.imgPicker));
  formData.append("cate1", userInput.cate1);
  formData.append("cate2", userInput.cate2);
  formData.append("title", userInput.title);
  formData.append("price", userInput.price);
  formData.append("originPrice", userInput.originPrice);
  formData.append("size", userInput.size);
  formData.append("state", userInput.state);
  formData.append("wearCnt", userInput.wearCnt);
  formData.append("pollution", userInput.pollution);
  formData.append("introduction", userInput.introduction);
  const res = await fetch(`http://localhost:5000/product/upload`, {
    method: "POST",
    body: formData,
    headers: { Authorization: localStorage.getItem("accessToken") },
    mode: "cors",
  });
  return res;
};
