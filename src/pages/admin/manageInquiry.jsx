import { useEffect, useState } from "react";
import { getInquiryLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";

const ManageInquiry = () => {
  const [result, setResult] = useState([]);
  const GetInquiryLists = async () => {
    const res = await getInquiryLists();
    setResult(res.data.result);
  };

  useEffect(() => {
    GetInquiryLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>문의사항 확인</h1>
      <div className={styles.board}>
        <div className={styles.boardLine}>
          <span>문의사항 ID</span>
          <span>제목</span>
          <span>문의 날짜</span>
          <span>답변 여부</span>
        </div>
        {result.length != 0 &&
          result?.map((data, i) => {
            return (
              <Link
                to={`/manage/inquiry/${data.q_id}`}
                className={styles.boardLine}
                key={i}
              >
                <span>{data.q_id}</span>
                <span>{data.q_title}</span>
                <span>{data.q_date?.substr(0, 10)}</span>
                <span>
                  {data.q_answer === null ? "답변 요청" : "답변 완료"}
                </span>
              </Link>
            );
          })}
      </div>
      <div className={styles.btnSet}>
        <button type="button">이전</button>
        <button type="button">다음</button>
      </div>
    </Layout>
  );
};
export default ManageInquiry;
