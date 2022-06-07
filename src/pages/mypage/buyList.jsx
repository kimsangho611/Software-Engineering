import { Layout } from "../../components/layout";
import { MypageProductCard } from "../../components/mypage/mypageCard";
import styles from "./list.module.scss";

const MyPageBuyList = () => {
  const productInfo = [
    {
      title: "한 번만 입은 h&m 니트 팔아요",
      state: "판매중",
      category1: "WOMEN",
      category2: "니트",
      date: "2022.06.12",
    },
    {
      title: "8세컨즈 원피스 팔아요",
      state: "거래 완료",
      category1: "WOMEN",
      category2: "원피스",
      date: "2022.06.02",
    },
    {
      title: "바지 팔아요",
      state: "판매중",
      category1: "MEN",
      category2: "바지",
      date: "2022.05.24",
    },
  ];
  return (
    <Layout otherClass={styles.mypageBuyList}>
      <h1 className={styles.title}>구매 목록</h1>
      <div className={styles.lists}>
        {productInfo.map((data, i) => {
          return (
            <div className={styles.card} key={i}>
              <span className={styles.date}>{data.date}</span>
              <MypageProductCard productInfo={data} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyPageBuyList;
