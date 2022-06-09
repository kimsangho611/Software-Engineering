import { IC_Piggy_Bank } from "../../assets/icons";
import { OrangeBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const PointChargeModal = ({ setModal, setAmount, onClick }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.pointChargeModal}>
      <IC_Piggy_Bank />
      <h1>충전하실 포인트를 입력해주세요.</h1>
      <input type="number" onChange={(e) => setAmount(e.target.value)} />
      <OrangeBtn text={"충전하기"} onClick={onClick} />
    </Modal>
  );
};

export const PointChargeCompleteModal = () => {
  return (
    <Modal otherStyle={styles.pointChargeCompleteModal}>
      <IC_Piggy_Bank />
      <h1>
        충전이 완료되었습니다!
        <br />
        즐거운 쇼핑하세요.
      </h1>
      <OrangeBtn text={"확인"} onClick={() => window.location.reload()} />
    </Modal>
  );
};
