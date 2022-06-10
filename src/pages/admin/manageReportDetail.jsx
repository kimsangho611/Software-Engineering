import { useEffect, useState } from "react";
import styles from "./manageDetail.module.scss";
import { Layout } from "../../components/layout";
import { OrangeBtn } from "../../components/common/button";
import { useParams } from "react-router-dom";
import {
  getReportDetail,
  ignoreReport,
  reportUser,
} from "../../core/api/admin/manageDetail";
import { Link } from "react-router-dom";
import { ReportSuccessModal } from "../../components/modals/reportModal";

const ManageReportDetail = () => {
  const reportId = useParams()?.id;
  const [result, setResult] = useState([]);
  const [accept, setAccept] = useState(false);
  const [ignore, setIgnore] = useState(false);

  const GetReportDetail = async () => {
    const res = await getReportDetail(reportId);
    setResult(res.data.result[0]);
  };

  const ReportUser = async () => {
    const res = await reportUser(reportId);
    if (res === 200) setAccept(true);
    else alert("오류가 발생했습니다. 관리자에게 문의하세요.");
  };

  const IgnoreReport = async () => {
    const res = await ignoreReport(reportId);
    if (res === 200) setIgnore(true);
    else alert("오류가 발생했습니다. 관리자에게 문의하세요.");
  };

  useEffect(() => {
    GetReportDetail();
  }, []);

  return (
    <Layout otherClass={styles.manageDetail}>
      {accept && (
        <ReportSuccessModal
          setModal={setAccept}
          contents={
            <div className={styles.stopped}>
              <span>정지된 사용자</span>
              <span>{result.reported_email}</span>
            </div>
          }
        />
      )}
      {ignore && (
        <ReportSuccessModal
          setModal={setIgnore}
          contents={
            <div className={styles.stopped}>
              <span>신고 무시</span>
            </div>
          }
        />
      )}
      <h1 className={styles.title}>신고 처리</h1>

      <div className={styles.reportContent}>
        <span className={styles.topLine}>
          <h1>{result.r_title}</h1>
          <span>신고자: {result.reporting_email}</span>
        </span>
        <div className={styles.line} />
        <p>{result.r_contents}</p>
      </div>

      <div className={styles.orangeBtnSet}>
        <Link to={`/product/detail/${result.Product_p_id}`}>
          <OrangeBtn text={"상세 페이지로 이동"} />
        </Link>
        <OrangeBtn text={"사용자 정지"} onClick={ReportUser} />
        <OrangeBtn text={"이 신고 무시"} onClick={IgnoreReport} />
      </div>
    </Layout>
  );
};
export default ManageReportDetail;
