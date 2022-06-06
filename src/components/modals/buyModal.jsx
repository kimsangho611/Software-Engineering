import { OrangeBtn, WhiteBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";

export const BuyModal = ({ setModal }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.buyModal}>
      <div>
        <span>현재 포인트 잔액</span>
        <strong>
          21,000<span>point</span>
        </strong>
      </div>

      <div>
        <span>구매 후 포인트 잔액</span>
        <strong>
          2,000<span>point</span>
        </strong>
      </div>
      <span className={styles.alert}>포인트를 사용하여 구매하시겠습니까?</span>
      <OrangeBtn text={"구매하기"} />
    </Modal>
  );
};

export const BuySuccessModal = ({ setModal }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.buySuccessModal}>
      <h1>구매가 완료되었습니다!</h1>
      <div>
        <span>포인트 잔액</span>
        <strong>
          2,000<span>point</span>
        </strong>
      </div>
      <OrangeBtn text={"구매하기"} otherStyle={styles.buyBtn} />
      <WhiteBtn text={"홈으로 가기"} />
    </Modal>
  );
};

export const BuyFailModal = ({ setModal }) => {
  return (
    <Modal setModal={setModal} otherStyle={styles.buyFailModal}>
      <h1>포인트가 부족합니다.</h1>
      <h1>포인트 충전 후 다시 시도해주세요.</h1>
      <OrangeBtn text={"포인트 충전하러 가기"} otherStyle={styles.chargeBtn} />
      <WhiteBtn text={"홈으로 가기"} />
    </Modal>
  );
};
