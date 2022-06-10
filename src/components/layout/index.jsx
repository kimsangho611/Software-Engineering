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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const [word, setWord] = useState("");
  const [style, setStyle] = useState({ display: "none" });
  const onClick = () => {
    word === ""
      ? alert("검색어를 입력해주세요!")
      : window.location.replace(`/search/${word}`);
  };
  return (
    <>
      <div
        style={style}
        className={styles.search}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <input
          className={styles.text}
          type={"text"}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
      </div>
      <button
        type="button"
        className={styles.topBarBtn}
        onClick={onClick}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <IC_Search />
      </button>
    </>
  );
};

const TopBar = ({ openSide, setOpenSide }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.topBar}>
      <button
        type="button"
        className={styles.topBarBtn}
        onClick={() => setOpenSide(!openSide)}
      >
        <IC_Hamburger_Bar />
      </button>
      <button
        type="button"
        className={styles.topBarBtn}
        onClick={() => navigate("/")}
      >
        <IC_Logo />
      </button>
      <SearchBar />
    </div>
  );
};

const Sidebar = ({ openSide, setOpenSide }) => {
  return (
    <div className="wholesidebar">
      <div className="sidebar">
        <div className="logoPart">
          <IC_SecondHand />
        </div>
        <div className="cates">
          {localStorage.getItem("userOrAdmin") === "1" &&
          localStorage.getItem("accessToken") ? (
            <>
              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("userOrAdmin");
                  alert("로그아웃 되었습니다.");
                  window.location.replace("/");
                }}
                className="bigcate"
              >
                로그아웃
              </button>
              <Link to={"/product/register"} className="bigcate">
                상품 판매하기
              </Link>
            </>
          ) : localStorage.getItem("userOrAdmin") === "2" &&
            localStorage.getItem("accessToken") ? (
            <Link to={"/admin/mypage"} className="bigcate">
              관리 페이지 메인
            </Link>
          ) : (
            <Link to={"/login"} className="bigcate">
              로그인/회원가입
            </Link>
          )}
          <div className="maincate">
            <span className="bigcate2">WOMEN</span>
            <a href="/category/WOMEN/아우터" className="smallcate">
              아우터
            </a>
            <a href="/category/WOMEN/니트" className="smallcate">
              니트
            </a>
            <a href="/category/WOMEN/셔츠" className="smallcate">
              셔츠
            </a>
            <a href="/category/WOMEN/티셔츠" className="smallcate">
              티셔츠
            </a>
            <a href="/category/WOMEN/원피스" className="smallcate">
              원피스
            </a>
            <a href="/category/WOMEN/팬츠" className="smallcate">
              팬츠
            </a>

            <a href="/category/WOMEN/스커트" className="smallcate">
              스커트
            </a>
            <span className="bigcate2">MEN</span>
            <a href="/category/MEN/아우터" className="smallcate">
              아우터
            </a>
            <a href="/category/MEN/니트" className="smallcate">
              니트
            </a>
            <a href="/category/MEN/셔츠" className="smallcate">
              셔츠
            </a>
            <a href="/category/MEN/티셔츠" className="smallcate">
              티셔츠
            </a>
            <a href="/category/MEN/팬츠" className="smallcate">
              팬츠
            </a>
            <span className="bigcate2">ACC</span>
            <a href="/category/ACC/가방" className="smallcate">
              가방
            </a>
            <a href="/category/ACC/지갑" className="smallcate">
              지갑
            </a>
            <a href="/category/ACC/신발" className="smallcate">
              신발
            </a>
            <a href="/category/ACC/기타 잡화" className="smallcate">
              기타 잡화
            </a>
          </div>
          {localStorage.getItem("userOrAdmin") === "1" &&
          localStorage.getItem("accessToken") ? (
            <Link to={"/mypage"} className="bigcate">
              마이페이지
            </Link>
          ) : (
            <></>
          )}
          <a href="/notice" className="bigcate">
            공지사항
          </a>
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
