import { useEffect } from "react";
import { BoardLine } from "../../components/admin/board";
import { getUserLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";

const ManagePosting = () => {
  const GetUserLists = async () => {
    const res = await getUserLists();
    console.log("res=", res);
  };

  const user = [
    ["게시물 번호", "판매자", "판매 상태", "게시일자", "게시물 삭제"],
    ["user2@email.com", "김지수", "거래 중", "2022-06-10", 0],
    ["user2@email.com", "김하나", "거래 완료", "2022-05-20", 1],
    ["user2@email.com", "김다인", "거래 완료", "2022-05-14", 0],
    ["user2@email.com", "김지수", "거래 중", "2022-06-10", 0],
    ["user2@email.com", "김하나", "거래 완료", "2022-05-20", 1],
    ["user2@email.com", "김다인", "거래 완료", "2022-05-14", 0],
    ["user2@email.com", "김지수", "거래 중", "2022-06-10", 0],
    ["user2@email.com", "김하나", "거래 완료", "2022-05-20", 1],
    ["user2@email.com", "김다인", "거래 완료", "2022-05-14", 0],
    ["user2@email.com", "김지수", "거래 중", "2022-06-10", 0],
    ["user2@email.com", "김하나", "거래 완료", "2022-05-20", 1],
    ["user2@email.com", "김다인", "거래 완료", "2022-05-14", 0],
    ["user2@email.com", "김지수", "거래 중", "2022-06-10", 0],
    ["user2@email.com", "김하나", "거래 완료", "2022-05-20", 1],
    ["user2@email.com", "김다인", "거래 완료", "2022-05-14", 0],
  ];

  useEffect(() => {
    GetUserLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>게시물 관리</h1>
      <div className={styles.board}>
        {user.map((data, i) => {
          return <BoardLine list={data} key={i} />;
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
