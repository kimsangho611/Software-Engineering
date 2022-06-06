import { useState } from "react";
import { Layout } from "../components/layout";
import styles from "./productDetail.module.scss";
import sample from "../assets/samples/product.png";
import { IC_Heart, IC_Siren } from "../assets/icons";
import { OrangeBtn } from "../components/common/button";
import { ProductInfoLine } from "../components/productDetail/productInfoLine";
import { ReportModal } from "../components/modals/reportModal";
import {
  BuyModal,
  BuySuccessModal,
  BuyFailModal,
} from "../components/modals/buyModal";

const ProductDetail = () => {
  const [like, setLike] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  return (
    <Layout otherClass={styles.productDetailLayout}>
      {reportModal && <ReportModal setModal={setReportModal} />}
      {buyModal && <BuyModal setModal={setBuyModal} />}

      <div className={styles.productImg}>
        <img src={sample} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.categoryInfo}>
          <span className={styles.category}>{`${"WOMEN"} > ${"니트"}`}</span>
          <button type="button" onClick={() => setReportModal(true)}>
            <IC_Siren width={26} height={26} />
            신고하기
          </button>
        </div>
        <h1>{`한 번만 입은 h&m 니트 팔아요`}</h1>

        <div className={styles.dealInfo}>
          <strong className={styles.status}>거래 중</strong>
          <strong className={styles.price}>
            19,000
            <span>원</span>
          </strong>
        </div>

        <div className={styles.line} />

        <div className={styles.postInfo}>
          <div>
            <span>
              <IC_Heart />
              10
            </span>
            <span>조회수 50회</span>
          </div>
          <span>상품 등록일 2022-04-13</span>
        </div>

        <div className={styles.infos}>
          <ProductInfoLine title={"정가"} content={"15,000원"} />
          <ProductInfoLine title={"사이즈"} content={"M"} />
          <ProductInfoLine title={"상품 상태"} content={"중고"} />
          <ProductInfoLine title={"실착 횟수"} content={"1번"} />
          <ProductInfoLine title={"오염 여부"} content={"없음"} />
          <ProductInfoLine
            title={"상품 설명"}
            content={
              "집에서 한 번만 입어본 h&m 니트입니다. 사이즈가 잘 안 맞아서 팔아요~"
            }
          />
        </div>

        <div className={styles.btns}>
          <OrangeBtn
            text={"바로 구매"}
            onClick={() => setBuyModal((prev) => !prev)}
          />
          <button
            type="button"
            className={styles.whiteBtn}
            onClick={() => setLike((prev) => !prev)}
          >
            <IC_Heart
              className={like ? styles.heartFill : styles.heartNotFill}
            />
            찜
          </button>
        </div>
      </div>

      <div className={styles.line} />
    </Layout>
  );
};

export default ProductDetail;
