import { useEffect, useState } from "react";
import styles from "./manageDetail.module.scss";
import { Layout } from "../../components/layout";
import { OrangeBtn } from "../../components/common/button";
import { useParams } from "react-router-dom";
import { EditNotice, GetEditNoticeDetail } from "../../core/api/admin/notice";

const ManageNoticeEdit = () => {
  const reportId = useParams()?.id;
  const [result, setResult] = useState([]);

  const Fetch = async () => {
    const res = await GetEditNoticeDetail(reportId);
    setResult(res.result[0]);
  };

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <Layout otherClass={styles.manageDetail}>
      <h1 className={styles.title}>공지사항 수정</h1>

      <div className={styles.reportContent}>
        <span className={styles.topLine}>
          <input
            type={"text"}
            value={result.post_title}
            onChange={(e) =>
              setResult({ ...result, post_title: e.target.value })
            }
          />
        </span>
        <div className={styles.line} />
        <textarea
          value={result.post_contents}
          onChange={(e) =>
            setResult({ ...result, post_contents: e.target.value })
          }
        />
      </div>

      <div className={styles.orangeBtnSet}>
        <div></div>
        <OrangeBtn
          text={"수정 완료"}
          onClick={async () => {
            console.log(result.post_id, result.title);
            const res = await EditNotice(
              result.post_id,
              result.post_title,
              result.post_contents
            );
            if (res.success) {
              window.location.replace(`/admin/manage/notice/${result.post_id}`);
            } else {
              alert("수정에 실패했습니다. 다시 시도해주세요.");
            }
          }}
        />
        <div></div>
      </div>
    </Layout>
  );
};
export default ManageNoticeEdit;
