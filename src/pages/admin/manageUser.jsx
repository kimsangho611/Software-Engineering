import { useEffect } from "react";
import { BoardLine } from "../../components/admin/board";
import { getUserLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";

const ManageUser = () => {
  const GetUserLists = async () => {
    const res = await getUserLists();
    console.log("res=", res);
  };

  const user = [
    ["아이디", "이름", "휴대폰 번호", "가입 일자", "판매 횟수"],
    ["user2@email.com", "김지수", "010-0000-0000", "2022-06-10", 0],
    ["user4@email.com", "이지수", "010-0000-0001", "2022-06-10", 6],
    ["user6@email.com", "박지수", "010-0000-0002", "2022-06-10", 3],
    ["user8@email.com", "신지수", "010-0000-0003", "2022-06-10", 2],
    ["user2@email.com", "김지수", "010-0000-0000", "2022-06-10", 0],
    ["user4@email.com", "이지수", "010-0000-0001", "2022-06-10", 6],
    ["user6@email.com", "박지수", "010-0000-0002", "2022-06-10", 3],
    ["user8@email.com", "신지수", "010-0000-0003", "2022-06-10", 2],
    ["user2@email.com", "김지수", "010-0000-0000", "2022-06-10", 0],
    ["user4@email.com", "이지수", "010-0000-0001", "2022-06-10", 6],
    ["user6@email.com", "박지수", "010-0000-0002", "2022-06-10", 3],
    ["user8@email.com", "신지수", "010-0000-0003", "2022-06-10", 2],
  ];

  useEffect(() => {
    GetUserLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>사용자 관리</h1>
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
export default ManageUser;
