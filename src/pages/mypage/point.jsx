import { Fragment, useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import {
  PointChargeCompleteModal,
  PointChargeModal,
} from "../../components/modals/pointModal";
import { MypagePointLine } from "../../components/mypage/mypageLine";
import { getPoint, getPointList } from "../../core/api/point/getPoint";
import styles from "./point.module.scss";
import { chargePoint } from "../../core/api/point/chargePoint";

const MyPagePoint = () => {
  const [charge, setCharge] = useState(false);
  const [chargeComp, setChargeComp] = useState(false);
  const [list, setList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [nowPoint, setNowPoint] = useState();

  const GetPoints = async () => {
    const res = await getPointList();
    const res2 = await getPoint();
    setList(res.result);
    setNowPoint(res2.result[0].u_point);
  };

  useEffect(() => {
    GetPoints();
  }, []);

  const Charge = async () => {
    const res = await chargePoint(amount);
    if (res === 200) {
      setCharge(false);
      setChargeComp(true);
    }
  };

  return (
    <Layout otherClass={styles.mypagePoint}>
      {chargeComp && <PointChargeCompleteModal />}
      {charge && (
        <PointChargeModal
          setModal={setCharge}
          setAmount={setAmount}
          onClick={Charge}
        />
      )}
      <h1 className={styles.mypagePointTitle}>포인트</h1>
      <div className={styles.current}>
        <strong className={styles.currentPoint}>
          {nowPoint?.toLocaleString("ko-KR")} point
        </strong>
        <button
          type="button"
          onClick={() => setCharge(true)}
          className={styles.customBtn}
        >
          충전하기
        </button>
      </div>
      {list.map((data, i) => {
        return (
          <Fragment key={i}>
            <span className={styles.date}>
              {data.point_date?.substr(0, 10)}
            </span>
            <MypagePointLine pointInfo={data} />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export default MyPagePoint;
