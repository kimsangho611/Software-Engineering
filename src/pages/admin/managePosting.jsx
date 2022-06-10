import { useEffect, useState } from "react";
import { getInquiryLists, getPostingLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";
import { BoardLine } from "../../components/admin/board";

const ManagePosting = () => {
  const [result, setResult] = useState([]);
  const title = [
    "게시물 번호",
    "판매자",
    "판매 상태",
    "게시 일자",
    "게시물 조회",
    "게시물 삭제",
  ];

  const GetPostingLists = async () => {
    const res = await getPostingLists();
    setResult(res.data.result);
  };

  useEffect(() => {
    GetPostingLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>게시글 관리</h1>
      <div className={styles.board}>
        <BoardLine list={title} cnt={6} />
        {result.map((data, i) => {
          let dataFixed = data;
          dataFixed.p_date = data.p_date?.substr(0, 10);
          return <BoardLine list={dataFixed} cnt={6} posting={true} key={i} />;
        })}
      </div>
      <div className={styles.btnSet}>
        <button type="button">이전</button>
        <button type="button">다음</button>
      </div>
    </Layout>
  );
};
export default ManagePosting;
