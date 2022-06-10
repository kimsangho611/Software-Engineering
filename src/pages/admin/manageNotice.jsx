import { useEffect, useState } from "react";
import { getInquiryLists, getNoticeLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";
import { BoardLine } from "../../components/admin/board";
import { OrangeBtn } from "../../components/common/button";

const ManageNotice = () => {
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
      <h1 className={styles.title}>공지사항 관리</h1>
      <div className={styles.board}>
        <BoardLine list={title} cnt={4} />
        {result.map((data, i) => {
          let dataFixed = data;
          dataFixed.post_date = data.post_date?.substr(0, 10);
          return (
            <Link
              to={`/admin/manage/notice/${data.post_id}`}
              className={styles.boardLine}
              key={i}
            >
              <BoardLine list={dataFixed} cnt={4} />
            </Link>
          );
        })}
      </div>
      <OrangeBtn text={"공지사항 등록"} />
    </Layout>
  );
};
export default ManageNotice;
