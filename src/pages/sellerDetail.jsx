import { Layout } from "../components/layout";
import styles from "./sellerDetail.module.scss";
import { useParams } from "react-router-dom";
import { getSellerReview } from "../core/api/mypage/review";
import { useEffect } from "react";
import { useState } from "react";

const SellerInfo = () => {
  const param = useParams();
  const seller = param.uid;
  const [detail, setDetail] = useState([]);
  const [avg, setAvg] = useState(0);
  const fetch = async () => {
    const res = await getSellerReview(seller);
    setDetail(res.list);
    setAvg(res.avg.u_star);
  };
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    console.log("detail:", detail);
  }, [detail]);
  return (
    <Layout otherClass={styles.sellerInfo}>
      <h1>판매자 정보</h1>
      <div className={styles.reviewLine}>
        <div className={styles.alignCol}>
          <h3>평균 평점</h3>
          <span className={styles.star}>
            ★★★★★
            <span style={{ width: `${avg * 20}%` }}>★★★★★</span>
          </span>
        </div>
      </div>
      <h2>리뷰 내역</h2>
      {detail?.map((data, i) => {
        return (
          <div className={styles.reviewLine}>
            <div className={styles.alignCol}>
              <span className={styles.star}>
                ★★★★★
                <span style={{ width: `${data.re_star * 20}%` }}>★★★★★</span>
              </span>
              <p>{data.re_contents}</p>
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default SellerInfo;
