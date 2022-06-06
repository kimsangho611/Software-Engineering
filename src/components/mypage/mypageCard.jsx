import styles from "./mypage.module.scss";
export const MypageCard = ({ children }) => {
  return <div className={styles.mypageCard}>{children}</div>;
};
