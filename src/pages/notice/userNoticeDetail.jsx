import { useEffect, useState } from "react";
import styles from "../admin/manageDetail.module.scss";
import { Layout } from "../../components/layout";
import { OrangeBtn } from "../../components/common/button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DeleteNotice, GetNoticeDetail } from "../../core/api/admin/notice";

const UserNoticeDetail = () => {
  const reportId = useParams()?.id;
  const [result, setResult] = useState([]);

  const Fetch = async () => {
    const res = await GetNoticeDetail(reportId);
    setResult(res.result[0]);
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <Layout otherClass={styles.manageDetail}>
      <h1 className={styles.title}>공지사항 조회</h1>
      <div className={styles.reportContent}>
        <span className={styles.topLine}>
          <h1>{result.post_title}</h1>
          <div className={styles.right}>
            <span>게시일: {result.post_date?.substr(0, 10)}</span>
            <span>조회수: {`${result.post_view}회`}</span>
          </div>
        </span>
        <div className={styles.line} />
        <p>{result.post_contents}</p>
      </div>

      <div className={styles.orangeBtnSet}>
        <div></div>
        <Link to={`/notice`}>
          <OrangeBtn text={"목록으로 돌아가기"} />
        </Link>
        <div></div>
      </div>
    </Layout>
  );
};
export default UserNoticeDetail;
