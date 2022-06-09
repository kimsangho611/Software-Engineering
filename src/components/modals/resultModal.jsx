import { IC_Check_Circle, IC_X_Circle } from "../../assets/icons";
import { OrangeBtn, WhiteBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const SuccessModal = ({ text, btnText, linkTo }) => {
  return (
    <Modal otherStyle={styles.successModal} prevent={true}>
      <IC_Check_Circle />
      <h1>{text}에 성공하였습니다.</h1>
      <OrangeBtn text={btnText} />
    </Modal>
  );
};

export const FailModal = ({ text, btnText, linkTo }) => {
  return (
    <Modal otherStyle={styles.failModal} prevent={true}>
      <IC_X_Circle />
      <h1>{text}에 실패하였습니다.</h1>
      <span>다시 시도하시거나, 관리자에게 문의해주세요.</span>
      <OrangeBtn text={btnText} />
    </Modal>
  );
};
