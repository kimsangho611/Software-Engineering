import "./login.css";
import { Layout } from "../../components/layout";
import { AuthInput, AuthRadio } from "../../components/auth/authBox";
import { useEffect, useState } from "react";
import { GreyBtn } from "../../components/common/button";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dis, setDis] = useState(true);
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
        <AuthRadio />
        <div className="inputSet">
          <AuthInput
            ispass={false}
            name={"email"}
            placeholder={"이메일"}
            value={email}
            setValue={setEmail}
          />
          <AuthInput
            ispass={true}
            name={"password"}
            placeholder={"비밀번호"}
            value={password}
            setValue={setPassword}
          />
        </div>
        <button
          className={`btn${dis}`}
          onClick={() => {
            console.log("로그인 클릭!");
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
