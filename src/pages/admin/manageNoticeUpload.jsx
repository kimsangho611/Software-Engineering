import { useEffect, useState } from "react";
import styles from "./manageDetail.module.scss";
import { Layout } from "../../components/layout";
import { OrangeBtn } from "../../components/common/button";
import { UploadNotice } from "../../core/api/admin/notice";

const ManageNoticeUpload = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  return (
    <Layout otherClass={styles.manageDetail}>
      <h1 className={styles.title}>공지사항 등록</h1>

      <div className={styles.reportContent}>
        <span className={styles.topLine}>
          <input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
        </span>
        <div className={styles.line} />
        <textarea
          value={contents}
          className={styles.noticeContents}
          onChange={(e) => setContents(e.target.value)}
          placeholder="내용을 입력해주세요."
        />
      </div>

      <div className={styles.orangeBtnSet}>
        <div></div>
        <OrangeBtn
          text={"등록 완료"}
          onClick={async () => {
            const res = await UploadNotice(title, contents);
            if (res.success) {
              window.location.replace(`/admin/manage/notice`);
            } else {
              alert("등록에 실패했습니다. 다시 시도해주세요.");
            }
          }}
        />
        <div></div>
      </div>
    </Layout>
  );
};
export default ManageNoticeUpload;
