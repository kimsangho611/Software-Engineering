import "./login.css";
import { Layout } from "../../components/layout";
import { AuthInput, AuthRadio } from "../../components/auth/authBox";
import { useEffect, useState } from "react";
import { GreyBtn } from "../../components/common/button";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../../core/api/auth/loginApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dis, setDis] = useState(true);
  const [x, setX] = useState("1");
  const navigate = useNavigate();
  useEffect(() => {
    if (email != "" && password != "") {
      setDis(false);
    } else {
      setDis(true);
    }
  }, [email, password]);
  return (
    <Layout>
      <div className="login">
        <div className="loginTitle">로그인</div>
        <AuthRadio x={x} setX={setX} />
        <div className="inputSet">
          <AuthInput
            type={"email"}
            name={"email"}
            placeholder={"이메일"}
            value={email}
            setValue={setEmail}
          />
          <AuthInput
            type={"password"}
            name={"password"}
            placeholder={"비밀번호"}
            value={password}
            setValue={setPassword}
          />
        </div>
        <button
          className={`btn${dis}`}
          onClick={async () => {
            const res = await LoginApi(x, email, password);
            if (res.success) {
              localStorage.setItem("accessToken", res.jwtToken);
              navigate("/");
            } else {
              alert(res.msg);
            }
          }}
          disabled={dis}
        >
          로그인
        </button>
        <div className="btnBottom">
          <span className="link">아이디 찾기</span>
          <span className="link">|</span>
          <span className="link">비밀번호 찾기</span>
          <span className="link">|</span>
          <Link to={"/signup"} className="link">
            회원가입
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
