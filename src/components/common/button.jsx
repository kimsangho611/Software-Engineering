import classNames from "classnames";
import styles from "./common.module.scss";
export const OrangeBtn = ({ text, otherStyle, onClick }) => {
  return (
    <button
      type="button"
      className={classNames(styles.orangeBtn, otherStyle)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const GreyBtn = ({ text }) => {
  return (
    <button type="button" className={styles.greyBtn} disabled={true}>
      {text}
    </button>
  );
};

export const WhiteBtn = ({ text }) => {
  return (
    <button type="button" className={styles.whiteBtn}>
      {text}
    </button>
  );
};
