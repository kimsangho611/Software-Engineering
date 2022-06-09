import { Fragment, useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { AskCompleteModal, AskModal } from "../../components/modals/askModal";
import { MypageAskLine } from "../../components/mypage/mypageLine";
import { askOneToOne, getAskList } from "../../core/api/mypage/ask";
import styles from "./point.module.scss";

const MyPageAsk = () => {
  const [ask, setAsk] = useState(false);
  const [askComp, setAskComp] = useState(false);
  const [open, setOpen] = useState([]);
  const [askContent, setAskContent] = useState({ title: "", contents: "" });
  const [askList, setAskList] = useState([]);

  const Ask = async () => {
    const res = await askOneToOne(askContent);
    if (res.success) {
      setAsk(false);
      setAskComp(true);
    }
  };

  const GetAskList = async () => {
    const res = await getAskList();
    setAskList(res.result);
  };

  useEffect(() => {
    if (askList.length !== 0) {
      askList.forEach((data) => {
        const qid = data.q_id;
        setOpen((prev) => ({ ...prev, [qid]: false }));
      });
    }
  }, [askList]);

  useEffect(() => {
    GetAskList();
  }, []);

  return (
    <Layout otherClass={styles.mypageAsk}>
      {askComp && <AskCompleteModal />}
      {ask && (
        <AskModal
          setModal={setAsk}
          setAskContent={setAskContent}
          onClick={Ask}
        />
      )}
      <h1 className={styles.mypageAskTitle}>1:1 문의</h1>
      <button
        type="button"
        onClick={() => setAsk(true)}
        className={styles.customBtn}
      >
        문의 작성
      </button>
      {askList.map((data, i) => {
        return (
          <Fragment key={i}>
            <span className={styles.date}>{data.q_date?.substr(0, 10)}</span>
            <MypageAskLine askInfo={data} setOpen={setOpen} open={open} />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export default MyPageAsk;
