import { OrangeBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const ReportModal = ({ setModal }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.reportModal}>
      <h1>신고하기</h1>
      <span>신고 사유를 입력해주세요</span>
      <span>관리자 확인 후 처리 예정입니다.</span>
      <textarea placeholder="신고 사유를 입력해주세요."></textarea>
      <OrangeBtn text={"신고하기"} />
    </Modal>
  );
};
