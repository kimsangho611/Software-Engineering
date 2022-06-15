import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { ReviewModal } from "../../components/modals/reviewModal";
import { MypageProductCard } from "../../components/mypage/mypageCard";
import { getBuyList } from "../../core/api/product/list";
import styles from "./list.module.scss";

const MyPageBuyList = () => {
  const [buy, setBuy] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [selected, setSelected] = useState("");
  const GetBuyList = async () => {
    const res = await getBuyList();
    setBuy(res.result);
  };

  useEffect(() => {
    GetBuyList();
  }, []);

  return (
    <Layout otherClass={styles.mypageBuyList}>
      {reviewModal && <ReviewModal productId={selected} />}
      <h1 className={styles.title}>구매 목록</h1>
      <div className={styles.lists}>
        {buy.map((data, i) => {
          return (
            <div className={styles.card} key={i}>
              <span className={styles.date}>{data.date}</span>
              <MypageProductCard
                productInfo={data}
                setReviewModal={setReviewModal}
                setSelected={setSelected}
                isSeller={false}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyPageBuyList;
