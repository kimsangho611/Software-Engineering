import { Layout } from "../../components/layout";
import { MypageProductCard } from "../../components/mypage/mypageCard";
import styles from "./list.module.scss";
import { getSellList } from "../../core/api/product/list";
import { useState, useEffect } from "react";

const MyPageSellList = () => {
  const [sell, setSell] = useState([]);
  const GetSellList = async () => {
    const res = await getSellList();
    setSell(res.result);
  };

  useEffect(() => {
    GetSellList();
  }, []);

  return (
    <Layout otherClass={styles.mypageBuyList}>
      <h1 className={styles.title}>판매 목록</h1>
      <div className={styles.lists}>
        {sell?.map((data, i) => {
          return (
            <div className={styles.card} key={i}>
              <span className={styles.date}>{data.p_date?.substr(0, 10)}</span>
              <MypageProductCard productInfo={data} isSeller={true} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyPageSellList;
