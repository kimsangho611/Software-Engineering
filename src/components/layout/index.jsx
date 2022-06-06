import styles from "./layout.module.scss";
import { IC_Hamburger_Bar, IC_Logo, IC_Search } from "../../assets/icons";
import classNames from "classnames";

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <button type="button" className={styles.topBarBtn}>
        <IC_Hamburger_Bar />
      </button>
      <button type="button" className={styles.topBarBtn}>
        <IC_Logo />
      </button>
      <button type="button" className={styles.topBarBtn}>
        <IC_Search />
      </button>
    </div>
  );
};

export const Layout = ({ otherClass, children }) => {
  return (
    <section className={styles.layout}>
      <TopBar />
      <div className={classNames(styles.contentLayout, otherClass)}>
        {children}
      </div>
    </section>
  );
};
