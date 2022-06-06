import styles from "./layout.module.scss";
import "./sidebar.css";
import {
  IC_Hamburger_Bar,
  IC_Logo,
  IC_Search,
  IC_Close,
  IC_SecondHand,
} from "../../assets/icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useState } from "react";

const TopBar = ({ openSide, setOpenSide }) => {
  return (
    <div className={styles.topBar}>
      <button
        type="button"
        className={styles.topBarBtn}
        onClick={() => setOpenSide(!openSide)}
      >
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

const Sidebar = ({ openSide, setOpenSide }) => {
  return (
    <div className="wholesidebar">
      <div className="sidebar">
        <IC_SecondHand />
        <div className="cates">
          <Link to={"/login"} className="bigcate">
            로그인/회원가입
          </Link>
          <span className="bigcate">상품 판매하기</span>
          <div className="maincate">
            <span className="bigcate2">WOMEN</span>
            <span className="smallcate">아우터</span>
            <span className="smallcate">니트</span>
            <span className="smallcate">셔츠/블라우스</span>
            <span className="smallcate">티셔츠</span>
            <span className="smallcate">원피스</span>
            <span className="smallcate">팬츠</span>
            <span className="smallcate">스커트</span>
            <span className="bigcate2">MEN</span>
            <span className="smallcate">아우터</span>
            <span className="smallcate">니트</span>
            <span className="smallcate">셔츠</span>
            <span className="smallcate">티셔츠</span>
            <span className="smallcate">팬츠</span>
            <span className="bigcate2">ACC</span>
            <span className="smallcate">가방</span>
            <span className="smallcate">지갑</span>
            <span className="smallcate">신발</span>
            <span className="smallcate">기타 잡화</span>
          </div>
          <span className="bigcate">마이페이지</span>
          <span className="bigcate">공지사항</span>
        </div>
      </div>
      <button className="closebtn" onClick={() => setOpenSide(!openSide)}>
        <IC_Close />
      </button>
    </div>
  );
};

export const Layout = ({ otherClass, children }) => {
  const [openSide, setOpenSide] = useState(false);
  return (
    <section className={styles.layout}>
      <TopBar openSide={openSide} setOpenSide={setOpenSide} />
      <div className={classNames(styles.contentLayout, otherClass)}>
        {children}
      </div>
      {openSide ? (
        <Sidebar openSide={openSide} setOpenSide={setOpenSide} />
      ) : (
        <div></div>
      )}
    </section>
  );
};
