import styles from "./common.module.scss";
import classNames from "classnames";

export const Modal = ({ children, setModal, otherStyle, prevent }) => {
  return (
    <div
      className={styles.modalBackground}
      // onClick={() => (prevent ? setModal(true) : setModal(false))}
    >
      <div
        className={classNames(styles.modalBox, otherStyle)}
        // onClick={() => setModal(true)}
      >
        {children}
      </div>
    </div>
  );
};
