import "./signup.css";
import { Layout } from "../../components/layout";
import { AuthInput } from "../../components/auth/authBox";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailValidation,
  NameValidation,
  PhoneValidation,
} from "../../util/validation";
import { SignupApi } from "../../core/api/auth/signupApi";
import { AuthRadio } from "../../components/auth/authBox";
const SignUp = () => {
  const navigate = useNavigate();
  const [x, setX] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dis, setDis] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (
      email === "" ||
      password === "" ||
      confirm === "" ||
      name === "" ||
      phone === ""
    ) {
      setDis(true);
      setErrMsg("모든 항목을 입력해주세요.");
    } else if (!EmailValidation(email)) {
      setDis(true);
      setErrMsg("올바른 이메일 형식을 입력해주세요.");
    } else if (password != confirm) {
      setDis(true);
      setErrMsg("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else if (!NameValidation(name)) {
      setDis(true);
      setErrMsg("이름은 한글 또는 영어로 입력해주세요.");
    } else if (!PhoneValidation(phone)) {
      setDis(true);
      setErrMsg("올바른 휴대전화 번호를 입력해주세요.");
    } else {
      setDis(false);
      setErrMsg("");
    }
  }, [email, password, confirm, name, phone]);
  return (
    <Layout>
      <div className="signup">
        <div className="signupTitle">회원가입</div>
        <AuthRadio x={x} setX={setX} />
        <section className="inputSet">
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
          <AuthInput
            type={"password"}
            name={"confirm"}
            placeholder={"비밀번호 확인"}
            value={confirm}
            setValue={setConfirm}
          />
          <AuthInput
            type={"name"}
            name={"name"}
            placeholder={"이름"}
            value={name}
            setValue={setName}
          />
          <AuthInput
            type={"phone"}
            name={"phone"}
            placeholder={"휴대전화"}
            value={phone}
            setValue={setPhone}
          />
        </section>
        <span className="errmsg">{errMsg}</span>
        <button
          className={`btn${dis}`}
          onClick={async () => {
            const res = await SignupApi(
              x,
              email,
              password,
              name,
              phone.replace(/-/g, "")
            );
            if (res.success) {
              alert("회원가입이 완료되었습니다.");
              navigate("/login");
            } else {
              alert(res.msg);
            }
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
