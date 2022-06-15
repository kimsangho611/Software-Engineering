import { Layout } from "../components/layout";
import styles from "./sellerDetail.module.scss";
import { useParams } from "react-router-dom";

const SellerInfo = () => {
  const param = useParams();
  const seller = param.uid;
  return (
    <Layout otherClass={styles.sellerInfo}>
      <h1>판매자 정보</h1>
      <div className={styles.reviewLine}>
        <div className={styles.alignCol}>
          <span className={styles.star}>
            ★★★★★
            <span style={{ width: "10%" }}>★★★★★</span>
          </span>
          <p>
            별로에요....별로에요....별로에요....별로에요....별로에요....별로에요....
          </p>
        </div>
        <span className={styles.buyer}>구매자 김하나 님</span>
      </div>
    </Layout>
  );
};

export default SellerInfo;
