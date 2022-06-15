import styles from "./mypage.module.scss";
import product from "../../assets/samples/product.png";
import { IC_Heart } from "../../assets/icons";
import temp from "../common/productBlock.css";
import { Link } from "react-router-dom";

export const MypageCard = ({ children, link }) => {
  return (
    <Link to={link} className={styles.mypageCard}>
      {children}
    </Link>
  );
};

export const MypageProductCard = ({
  productInfo,
  setReviewModal,
  setSelected,
}) => {
  return (
    <div className={styles.mypageProductCard}>
      <img src={productInfo.p_image} alt="clothes" />
      <div className={styles.contents}>
        <span
          className={styles.category}
        >{`${productInfo.p_category1} > ${productInfo.p_category2}`}</span>
        <h1>{productInfo.p_title}</h1>
        {productInfo.p_trade === "거래 중" ? (
          <button
            type="button"
            className={styles.orangeTag}
            onClick={() => {
              setReviewModal(true);
              setSelected(productInfo.p_id);
            }}
          >
            <span>거래 확정</span>
          </button>
        ) : (
          <div className={styles.greyTag}>
            <span>{productInfo.p_trade}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const MypageProductCardWPrice = ({ productInfo }) => {
  return (
    <div className={temp.productBlock}>
      {productInfo.state === "판매 완료" ? (
        <div className={temp.alreadySell} />
      ) : (
        <></>
      )}
      <div className={temp.imgPart}>
        <img className={temp.img} src={productInfo.img} alt={"clothes"} />
        <div className={temp.heart}>
          <IC_Heart className={temp.heartIcon} />
          <span className={temp.heartNum}>
            {productInfo.like
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
      </div>
      <div className={temp.contentsPart}>
        <span
          className={temp.cateName}
        >{`${productInfo.firstCate}>${productInfo.secondCate}`}</span>
        <span className={temp.title}>{productInfo.title}</span>
        <div className={temp.bottom}>
          <span className={temp.view}>
            {`조회수 ${productInfo.view
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}회`}
          </span>
          {productInfo.state === "판매 완료" ||
          productInfo.state === "거래 중" ? (
            <span className={temp.price}>{`${productInfo.state}`}</span>
          ) : (
            <span className={temp.price}>{`${productInfo.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`}</span>
          )}
        </div>
      </div>
    </div>
  );
};
