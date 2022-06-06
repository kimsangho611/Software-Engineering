import { Fragment, useState } from "react";
import { Layout } from "../../components/layout";
import { AskCompleteModal, AskModal } from "../../components/modals/askModal";
import {
  PointChargeCompleteModal,
  PointChargeModal,
} from "../../components/modals/pointModal";
import {
  MypageAskLine,
  MypagePointLine,
} from "../../components/mypage/mypageLine";
import styles from "./point.module.scss";

const MyPageAsk = () => {
  const [ask, setAsk] = useState(false);
  const [open, setOpen] = useState(true);
  //   const [open, setOpen] = useState({ 1: false, 2: true, 3: false });

  const askInfo = [
    //id 필요
    {
      inquiryId: 3,
      inquiryTitle: "포인트 관련 문의3",
      inquiryContent: "포인트가 안 들어옵니다3.",
      inquiryDate: "2022.06.14",
      isAnswer: false,
      adminAnswer: "",
    },
    {
      inquiryId: 2,
      inquiryTitle: "포인트 관련 문의2",
      inquiryContent: "포인트가 안 들어옵니다2.",
      inquiryDate: "2022.04.20",
      isAnswer: true,
      adminAnswer: "관리자 답변",
    },
    {
      inquiryId: 1,
      inquiryTitle: "포인트 관련 문의1",
      inquiryContent: "포인트가 안 들어옵니다1.",
      inquiryDate: "2022.04.14",
      isAnswer: true,
      adminAnswer: "관리자 답변",
    },
  ];
  return (
    <Layout otherClass={styles.mypageAsk}>
      {ask && <AskCompleteModal setModal={setAsk} />}
      {ask && <AskModal setModal={setAsk} />}
      <h1 className={styles.mypageAskTitle}>1:1 문의</h1>
      <button
        type="button"
        onClick={() => setAsk(true)}
        className={styles.customBtn}
      >
        문의 작성
      </button>
      {askInfo.map((data, i) => {
        return (
          <Fragment key={i}>
            <span className={styles.date}>2022.04.14</span>
            <MypageAskLine askInfo={data} setOpen={setOpen} open={open} />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export default MyPageAsk;
