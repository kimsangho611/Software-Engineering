import "./dropSuccess.css";
import { Layout } from "../../components/layout";
import { useNavigate } from "react-router-dom";

const DropSuccess = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="dropSuccess">
        <div className="dropTitle">회원탈퇴</div>
        <div className="align">
          <span className="success">탈퇴가 완료되었습니다.</span>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DropSuccess;
