import { useEffect, useState } from "react";
import { BoardLine } from "../../components/admin/board";
import { getUserLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [user, setUser] = useState([]);
  const title = ["아이디", "이름", "휴대폰 번호", "가입 일자", "판매 횟수"];

  const GetUserLists = async () => {
    const res = await getUserLists();
    setUser(res.data.result);
  };

  useEffect(() => {
    GetUserLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>사용자 관리</h1>
      <div className={styles.board}>
        <BoardLine list={title} cnt={5} />
        {user.map((data, i) => {
          return <BoardLine list={data} key={i} cnt={5} />;
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
