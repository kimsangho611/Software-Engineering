import styles from "./productInfoLine.module.scss";

export const ProductInfoLine = ({ title, content }) => {
  return (
    <div className={styles.infoLine}>
      <span className={styles.infoTitle}>{title}</span>
      <span className={styles.infoContent}>{content}</span>
    </div>
  );
};
