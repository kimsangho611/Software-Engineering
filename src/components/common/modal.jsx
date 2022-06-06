import styles from "./common.module.scss";
import classNames from "classnames";

export const Modal = ({ children, setModal, otherStyle }) => {
  return (
    <div
      className={styles.modalBackground}
      onClick={() => setModal((prev) => !prev)}
    >
      <div className={classNames(styles.modalBox, otherStyle)}>{children}</div>
    </div>
  );
};
