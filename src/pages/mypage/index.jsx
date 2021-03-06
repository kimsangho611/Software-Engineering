import { Layout } from "../../components/layout";
import styles from "./mypageMain.module.scss";
import { OrangeBtn } from "../../components/common/button";
import { MypageCard } from "../../components/mypage/mypageCard";
import {
  IC_Counselor,
  IC_Heart_In_Circle,
  IC_Person,
  IC_Piggy_Bank,
  IC_Shop,
  IC_Shopping_Bag,
} from "../../assets/icons";
import { useNavigate } from "react-router-dom";

const MyPageMain = () => {
  const navigate = useNavigate();
  return (
    <Layout otherClass={styles.mypageMain}>
      <h1>마이페이지</h1>
      <div className={styles.cardLine}>
        <MypageCard link={"/mypage/editInfo"}>
          <IC_Person />
          <span>내 정보 수정</span>
        </MypageCard>

        <MypageCard link={"/mypage/buyList"}>
          <IC_Shopping_Bag />
          <span>구매 목록</span>
        </MypageCard>

        <MypageCard link={"/mypage/sellList"}>
          <IC_Shop />
          <span>판매 목록</span>
        </MypageCard>
      </div>

      <div className={styles.cardLine}>
        <MypageCard link={"/mypage/activityList"}>
          <IC_Heart_In_Circle />
          <span>활동 목록</span>
        </MypageCard>

        <MypageCard link={"/mypage/ask"}>
          <IC_Counselor />
          <span>1:1 문의</span>
        </MypageCard>

        <MypageCard link={"/mypage/point"}>
          <IC_Piggy_Bank />
          <span>포인트</span>
        </MypageCard>
      </div>
      <OrangeBtn onClick={() => navigate("/drop")} text={"회원탈퇴"} />
    </Layout>
  );
};

export default MyPageMain;
