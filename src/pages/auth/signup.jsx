import "./signup.css";
import { Layout } from "../../components/layout";
import { AuthInput } from "../../components/auth/authBox";
import { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dis, setDis] = useState(true);
  return (
    <Layout>
      <div className="signup">
        <div className="signupTitle">회원가입</div>
        <section className="inputSet">
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
          <AuthInput
            ispass={true}
            name={"confirm"}
            placeholder={"비밀번호 확인"}
            value={confirm}
            setValue={setConfirm}
          />
          <AuthInput
            ispass={false}
            name={"name"}
            placeholder={"이름"}
            value={name}
            setValue={setName}
          />
          <AuthInput
            ispass={false}
            name={"phone"}
            placeholder={"휴대전화"}
            value={phone}
            setValue={setPhone}
          />
        </section>
        <button
          className={`btn${dis}`}
          onClick={() => {
            console.log("회원가입 클릭!");
          }}
          disabled={dis}
        >
          회원가입
        </button>
        <div className="btnBottom">
          <span className="link">아이디 찾기</span>
          <span className="link">|</span>
          <span className="link">비밀번호 찾기</span>
          <span className="link">|</span>
          <Link to={"/login"} className="link">
            로그인
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
