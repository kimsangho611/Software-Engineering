import { Layout } from "../../components/layout";
import styles from "./adminMain.module.scss";
import { MypageCard } from "../../components/mypage/mypageCard";
import {
  IC_Person,
  IC_Shopping_Bag,
  IC_Speaker,
  IC_CheckBox,
  IC_Siren,
  IC_LogOut,
} from "../../assets/icons";

const AdminMain = () => {
  return (
    <Layout otherClass={styles.adminMain}>
      <h1>관리 페이지</h1>
      <div className={styles.cardLine}>
        <MypageCard link={"/"}>
          <IC_Person />
          <span>사용자 관리</span>
        </MypageCard>

        <MypageCard link={"/"}>
          <IC_Shopping_Bag />
          <span>게시물 관리</span>
        </MypageCard>

        <MypageCard link={"/"}>
          <IC_Speaker />
          <span>공지사항 관리</span>
        </MypageCard>
      </div>

      <div className={styles.cardLine}>
        <MypageCard link={"/"}>
          <IC_CheckBox />
          <span>문의사항 확인</span>
        </MypageCard>

        <MypageCard link={"/"}>
          <IC_Siren />
          <span>신고 처리</span>
        </MypageCard>

        <MypageCard link={"/"}>
          <IC_LogOut />
          <span>로그아웃</span>
        </MypageCard>
      </div>
    </Layout>
  );
};

export default AdminMain;
