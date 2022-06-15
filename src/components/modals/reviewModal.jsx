import { useEffect } from "react";
import { useState } from "react";
import { writeReview } from "../../core/api/mypage/review";
import { BuyConfirm } from "../../core/api/mypage/sellConfirm";
import { OrangeBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const ReviewModal = ({ productId }) => {
  const [review, setReview] = useState({
    review_title: "",
    review_contents: "",
    review_star: 0,
  });

  const drawStar = () => {
    const fillStar = document.getElementById("fill");
    const fillRange = document.getElementById("range");
    fillStar.style.width = `${fillRange.value * 10}%`;
    setReview({ ...review, review_star: fillRange.value / 2 });
  };

  useEffect(() => {
    console.log(review.review_star);
  }, [review.review_star]);

  return (
    <Modal otherStyle={styles.reviewModal} prevent={true}>
      <h1>리뷰를 남겨보세요!</h1>
      <span className={styles.star}>
        ★★★★★
        <span id="fill">★★★★★</span>
        <input
          id="range"
          type="range"
          onInput={drawStar}
          value="0"
          step="0"
          min="0"
          max="10"
        />
      </span>
      <textarea
        placeholder={"후기를 남겨주세요!"}
        className={styles.reviewText}
        onChange={(e) =>
          setReview({ ...review, review_contents: e.target.value })
        }
      ></textarea>
      <OrangeBtn
        text={"후기 작성"}
        onClick={async () => {
          console.log("produ=", productId);
          const res = await writeReview(productId, review);
          const res2 = await BuyConfirm(productId);
          if (res2.success) {
            window.location.reload();
          }
        }}
      />
    </Modal>
  );
};
