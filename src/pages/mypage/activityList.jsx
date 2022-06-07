import ProductBlock from "../../components/common/productBlock";
import { Layout } from "../../components/layout";
import {
  MypageProductCard,
  MypageProductCardWPrice,
} from "../../components/mypage/mypageCard";
import styles from "./list.module.scss";
import product from "../../assets/samples/product.png";

const MyPageActivityList = () => {
  const productInfo = [
    {
      img: product,
      like: 1200,
      firstCate: "WOMEN",
      secondCate: "치마",
      title: "치마 팝니다",
      view: 4302,
      price: 18000,
      state: "판매 중",
    },
    {
      img: product,
      like: 200,
      firstCate: "MEN",
      secondCate: "바지",
      title: "바지 팝니다",
      view: 102,
      price: 26000,
      state: "거래 완료",
    },
    {
      img: product,
      like: 121,
      firstCate: "WOMEN",
      secondCate: "니트",
      title: "니트 팝니다",
      view: 412,
      price: 41000,
      state: "판매 중",
    },
  ];
  return (
    <Layout otherClass={styles.mypageBuyList}>
      <h1 className={styles.title}>판매 목록</h1>
      <select>
        <option>찜한 게시물</option>
        <option>댓글 단 게시물</option>
      </select>

      <div className={styles.lists}>
        {productInfo.map((data, i) => {
          return (
            <div className={styles.card} key={i}>
              <span className={styles.date}>{data.date}</span>
              <MypageProductCardWPrice productInfo={data} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyPageActivityList;
