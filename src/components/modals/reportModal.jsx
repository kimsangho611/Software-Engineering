import { OrangeBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const ReportModal = ({ setModal, setReport, onClick }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.reportModal} prevent={true}>
      <h1>신고하기</h1>
      <span>신고 사유를 입력해주세요</span>
      <span>관리자 확인 후 처리 예정입니다.</span>
      <input
        type="text"
        placeholder="제목"
        onChange={(e) =>
          setReport((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <textarea
        placeholder="신고 사유를 입력해주세요."
        onChange={(e) =>
          setReport((prev) => ({ ...prev, content: e.target.value }))
        }
      ></textarea>
      <OrangeBtn text={"신고하기"} onClick={onClick} />
    </Modal>
  );
};
