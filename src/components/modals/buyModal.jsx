import { getPoint } from "../../core/api/point/getPoint";
import { OrangeBtn, WhiteBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const BuyModal = ({ setModal, price, onClick }) => {
  const [nowPoint, setNowPoint] = useState(0);
  const NowPoint = async () => {
    const res = await getPoint();
    setNowPoint(res.result[0].u_point);
  };

  useEffect(() => {
    NowPoint();
  }, []);

  return (
    <Modal setModal={setModal} otherStyle={styles.buyModal}>
      <div>
        <span>현재 포인트 잔액</span>
        <strong>
          {nowPoint.toLocaleString("ko-KR")}
          <span>point</span>
        </strong>
      </div>

      <div>
        <span>구매 후 포인트 잔액</span>
        <strong>
          {(nowPoint - price).toLocaleString("ko-KR")}
          <span>point</span>
        </strong>
      </div>
      <span className={styles.alert}>포인트를 사용하여 구매하시겠습니까?</span>
      <OrangeBtn text={"구매하기"} onClick={onClick} />
    </Modal>
  );
};

export const BuySuccessModal = ({ setModal }) => {
  const [nowPoint, setNowPoint] = useState(0);
  const NowPoint = async () => {
    const res = await getPoint();
    setNowPoint(res.result[0].u_point);
  };

  useEffect(() => {
    NowPoint();
  }, []);

  return (
    <Modal setModal={setModal} otherStyle={styles.buySuccessModal}>
      <h1>구매가 완료되었습니다!</h1>
      <div>
        <span>포인트 잔액</span>
        <strong>
          {nowPoint.toLocaleString("ko-KR")}
          <span>point</span>
        </strong>
      </div>
      <Link to={"/mypage/buyList"}>
        <OrangeBtn text={"구매내역 확인"} otherStyle={styles.buyBtn} />
      </Link>
      <Link to={"/"}>
        <WhiteBtn text={"홈으로 가기"} />
      </Link>
    </Modal>
  );
};

export const BuyFailModal = ({ setModal }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.buyFailModal}>
      <h1>포인트가 부족합니다.</h1>
      <h1>포인트 충전 후 다시 시도해주세요.</h1>
      <Link to={"/mypage/point"}>
        <OrangeBtn
          text={"포인트 충전하러 가기"}
          otherStyle={styles.chargeBtn}
        />
      </Link>
      <Link to={"/"}>
        <WhiteBtn text={"홈으로 가기"} />
      </Link>
    </Modal>
  );
};
