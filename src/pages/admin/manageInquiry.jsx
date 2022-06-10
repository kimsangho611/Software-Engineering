import { useEffect, useState } from "react";
import { getInquiryLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";
import { BoardLine } from "../../components/admin/board";

const ManageInquiry = () => {
  const [result, setResult] = useState([]);
  const title = ["문의사항 ID", "제목", "문의 날짜", "답변 여부"];

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
        <BoardLine list={title} cnt={4} />
        {result.map((data, i) => {
          let dataFixed = data;
          dataFixed.q_answer =
            dataFixed.q_answer === null ? "답변 요청" : "답변 완료";
          dataFixed.q_date = data.q_date?.substr(0, 10);
          return (
            <Link
              to={`/admin/manage/inquiry/${data.q_id}`}
              className={styles.boardLine}
              key={i}
            >
              <BoardLine list={dataFixed} cnt={4} />
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
