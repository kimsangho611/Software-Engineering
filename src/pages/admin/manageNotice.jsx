import { useEffect, useState } from "react";
import { getInquiryLists, getNoticeLists } from "../../core/api/admin/manage";
import styles from "./manage.module.scss";
import { Layout } from "../../components/layout";
import { Link } from "react-router-dom";
import { OrangeBtn } from "../../components/common/button";

const ManageNotice = () => {
  const [result, setResult] = useState([]);
  const GetNoticeLists = async () => {
    const res = await getNoticeLists();
    console.log("res.data.reslut=", res.data.result);
    setResult(res.data.result);
  };

  useEffect(() => {
    GetNoticeLists();
  }, []);

  return (
    <Layout otherClass={styles.manage}>
      <h1 className={styles.title}>공지사항 관리</h1>
      <div className={styles.board}>
        <div className={styles.boardLine}>
          <span>게시물 ID</span>
          <span>제목</span>
          <span>게시일</span>
          <span>조회수</span>
        </div>
        {result.length != 0 &&
          result?.map((data, i) => {
            console.log("data=", data);
            return (
              <Link
                to={`/manage/notice/${data.q_id}`}
                className={styles.boardLine}
                key={i}
              >
                {
                  /* <span>{data.q_id}</span>
                <span>{data.q_title}</span>
                <span>{data.q_date?.substr(0, 10)}</span>
                <span>
                  {data.q_answer === null ? "답변 요청" : "답변 완료"}
                </span> */
                  //변경필요
                }
              </Link>
            );
          })}
      </div>
      <div className={styles.btnSet}>
        <button type="button">이전</button>
        <button type="button">다음</button>
      </div>
      <OrangeBtn text={"공지사항 등록"} otherStyle={styles.orange} />
    </Layout>
  );
};
export default ManageNotice;
