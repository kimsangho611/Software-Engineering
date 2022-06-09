import { useEffect } from "react";
import { BoardLine } from "../../components/admin/board";
import { getReportLists, getUserLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";

const ManageReport = () => {
  const GetReportLists = async () => {
    const res = await getReportLists();
    // const res = await getUserLists();
    console.log("res=", res);
  };

  useEffect(() => {
    GetReportLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>신고 처리</h1>
      <div className={styles.board}>
        <div className={styles.boardLine}>
          <span>신고한 사람</span>
          <span>신고된 사람</span>
          <span>신고 내용</span>
        </div>
      </div>
      {/* {result.length != 0 &&
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
              <span>{data.q_answer === null ? "답변 요청" : "답변 완료"}</span>
            </Link>
          );
        })} */}
      <div className={styles.btnSet}>
        <button type="button">이전</button>
        <button type="button">다음</button>
      </div>
    </Layout>
  );
};
export default ManageReport;
