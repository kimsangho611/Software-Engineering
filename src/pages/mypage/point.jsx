import { Fragment, useState } from "react";
import { Layout } from "../../components/layout";
import {
  PointChargeCompleteModal,
  PointChargeModal,
} from "../../components/modals/pointModal";
import { MypagePointLine } from "../../components/mypage/mypageLine";
import styles from "./point.module.scss";

const MyPagePoint = () => {
  const [charge, setCharge] = useState(false);
  const pointInfo = [
    {
      boughtProductTitle: "포인트 충전",
      isTradeConfirm: "none",
      pointTrade: +19000,
    },
    {
      boughtProductTitle: "한 번만 입은 h&m 니트 팔아요",
      isTradeConfirm: false,
      pointTrade: +19000,
    },
    {
      boughtProductTitle: "8seconds 치마 팝니다.",
      isTradeConfirm: true,
      pointTrade: -19000,
    },
  ];
  return (
    <Layout otherClass={styles.mypagePoint}>
      {charge && <PointChargeCompleteModal setModal={setCharge} />}
      {/* {charge && <PointChargeModal setModal={setCharge} />} */}
      <h1 className={styles.mypagePointTitle}>포인트</h1>
      <div className={styles.current}>
        <strong className={styles.currentPoint}>19,000 point</strong>
        <button
          type="button"
          onClick={() => setCharge(true)}
          className={styles.customBtn}
        >
          충전하기
        </button>
      </div>
      {pointInfo.map((data, i) => {
        return (
          <Fragment key={i}>
            <span className={styles.date}>2022.04.14</span>
            <MypagePointLine pointInfo={data} />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export default MyPagePoint;
