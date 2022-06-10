import { useEffect, useState } from "react";
import styles from "./manageDetail.module.scss";
import { Layout } from "../../components/layout";
import { OrangeBtn } from "../../components/common/button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DeleteNotice, GetNoticeDetail } from "../../core/api/admin/notice";

const ManageNoticeDetail = () => {
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
        <Link to={`/admin/manage/notice`}>
          <OrangeBtn text={"목록으로 돌아가기"} />
        </Link>
        <Link to={`/admin/manage/notice/${result.post_id}/edit`}>
          <OrangeBtn text={"게시물 수정"} />
        </Link>
        <OrangeBtn
          text={"게시물 삭제"}
          onClick={async () => {
            const res = await DeleteNotice(result.post_id);
            if (res.success) {
              alert("공지사항 삭제가 완료되었습니다.");
              window.location.replace("/admin/manage/notice");
            } else {
              alert("삭제에 실패했습니다.");
            }
          }}
        />
      </div>
    </Layout>
  );
};
export default ManageNoticeDetail;
