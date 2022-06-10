import { useEffect, useState } from "react";
import { getReportLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";
import { BoardLine } from "../../components/admin/board";

const ManageReport = () => {
  const [result, setResult] = useState([]);
  const title = ["신고한 사람", "신고된 사람", "신고 제목"];

  const GetReportLists = async () => {
    const res = await getReportLists();
    setResult(res.data.result);
  };

  useEffect(() => {
    GetReportLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>신고 처리</h1>
      <div className={styles.board}>
        <BoardLine list={title} cnt={3} />
        {result.map((data, i) => {
          return (
            <Link
              // to={`/admin/manage/report/${data.q_id}`}
              to={`/admin/manage/report/1`}
              className={styles.boardLine}
              key={i}
            >
              <BoardLine list={data} cnt={3} />
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
export default ManageReport;
