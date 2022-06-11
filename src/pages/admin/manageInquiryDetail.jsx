import { useEffect, useState } from "react";
import styles from "./manageDetail.module.scss";
import { Layout } from "../../components/layout";
import {
  getInquiryDetail,
  writeAnswerToInquiry,
} from "../../core/api/admin/manageDetail";
import { useParams } from "react-router-dom";
import { OrangeBtn } from "../../components/common/button";

const ManageInquiryDetail = () => {
  const param = useParams();
  const [result, setResult] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answerExists, setAnswerExists] = useState(false);

  const GetInquiryDetail = async () => {
    const res = await getInquiryDetail(param.id);
    setResult(res.result[0]);
    setAnswerExists(res.result[0].q_answer === null ? false : true);
  };

  useEffect(() => {
    GetInquiryDetail();
  }, []);

  return (
    <Layout otherClass={styles.manageDetail}>
      <h1 className={styles.title}>문의사항 확인</h1>
      <div className={styles.question}>
        <span className={styles.topLine}>
          <h1>{result.q_title}</h1>
          <span>문의한 사용자: {result.u_email}</span>
        </span>
        <div className={styles.line} />
        <p>{result.q_contents}</p>
      </div>
      {answerExists ? (
        <div className={styles.answer}>{result.q_answer}</div>
      ) : (
        <textarea
          placeholder="답변"
          className={styles.answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      )}
      {!answerExists && (
        <OrangeBtn
          text={"답변 등록"}
          onClick={async () => {
            const res = await writeAnswerToInquiry(param.id, answer);
            if (res === 200) {
              alert("답변 등록이 완료되었습니다.");
              window.location.reload();
            } else alert("답변 등록에 실패했습니다.");
          }}
        />
      )}
    </Layout>
  );
};
export default ManageInquiryDetail;
