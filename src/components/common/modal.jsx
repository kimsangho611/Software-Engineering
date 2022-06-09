import styles from "./common.module.scss";
import classNames from "classnames";

export const Modal = ({ children, setModal, otherStyle, prevent }) => {
  return (
    <div
      className={styles.modalBackground}
      onClick={() => (!prevent ? setModal((prev) => !prev) : "")}
    >
      <div className={classNames(styles.modalBox, otherStyle)}>{children}</div>
    </div>
  );
};
