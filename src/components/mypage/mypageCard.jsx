import styles from "./mypage.module.scss";
import product from "../../assets/samples/product.png";
import { IC_Heart } from "../../assets/icons";
import temp from "../common/productBlock.css";

export const MypageCard = ({ children }) => {
  return <div className={styles.mypageCard}>{children}</div>;
};

export const MypageProductCard = ({ productInfo }) => {
  console.log("pi=", productInfo);
  return (
    <div className={styles.mypageProductCard}>
      <img src={product} alt="clothes" />
      <div className={styles.contents}>
        <span
          className={styles.category}
        >{`${productInfo.category1} > ${productInfo.category2}`}</span>
        <h1>{productInfo.title}</h1>
        <div
          className={
            productInfo.state === "판매중" ? styles.orangeTag : styles.greyTag
          }
        >
          <span>{productInfo.state}</span>
        </div>
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
