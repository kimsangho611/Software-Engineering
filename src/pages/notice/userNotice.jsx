import { useEffect, useState } from "react";
import { getNoticeLists } from "../../core/api/admin/manage";
import styles from "../admin/manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";
import { BoardLine } from "../../components/admin/board";

const UserNotice = () => {
  const [result, setResult] = useState([]);
  const title = ["게시물 ID", "제목", "게시일", "조회수"];

  const GetNoticeLists = async () => {
    const res = await getNoticeLists();
    setResult(res.data.result);
  };

  useEffect(() => {
    GetNoticeLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>공지사항</h1>
      <div className={styles.board}>
        <BoardLine list={title} cnt={4} />
        {result.map((data, i) => {
          let dataFixed = data;
          dataFixed.post_date = data.post_date?.substr(0, 10);
          return (
            <Link
              to={`/notice/${data.post_id}`}
              className={styles.boardLine}
              key={i}
            >
              <BoardLine list={dataFixed} cnt={4} />
            </Link>
          );
        })}
      </div>
      <div className={(styles.btnSet, styles.noticeBtn)}>
        <button type="button">이전</button>
        <button type="button">다음</button>
      </div>
    </Layout>
  );
};
export default UserNotice;
