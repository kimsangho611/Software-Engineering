import { IC_Counselor, IC_Piggy_Bank } from "../../assets/icons";
import { OrangeBtn, WhiteBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const AskModal = ({ setModal, setAskContent, onClick }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.askModal}>
      <IC_Counselor />
      <input
        type="text"
        placeholder="제목"
        onChange={(e) =>
          setAskContent((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <textarea
        placeholder="문의 내용을 입력해주세요."
        onChange={(e) =>
          setAskContent((prev) => ({ ...prev, contents: e.target.value }))
        }
      ></textarea>
      <OrangeBtn text={"작성 완료"} onClick={onClick} />
    </Modal>
  );
};

export const AskCompleteModal = () => {
  return (
    <Modal otherStyle={styles.askCompleteModal}>
      <IC_Counselor />
      <h1>문의글 작성이 완료되었습니다.</h1>
      <span>
        관리자가 확인 후,
        <br />
        1~2일 이내에 답변해드릴 예정입니다.
      </span>
      <OrangeBtn text={"확인"} onClick={() => window.location.reload()} />
    </Modal>
  );
};
