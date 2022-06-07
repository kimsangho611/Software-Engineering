import { useState } from "react";
import { AuthInput } from "../../components/auth/authBox";
import { Layout } from "../../components/layout";
import "./drop.css";

const Drop = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [drop, setDrop] = useState("");
  const [dis, setDis] = useState(true);
  return (
    <Layout>
      <div className="drop">
        <div className="dropTitle">회원탈퇴</div>
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
        </section>
        <section className="bottom">
          <span className="text">
            탈퇴를 원하시면, 아래 입력창에 '탈퇴'라고 적어주세요.
          </span>
          <AuthInput
            type={"text"}
            name={"drop"}
            placeholder={"탈퇴"}
            value={drop}
            setValue={setDrop}
          />
        </section>
        <button
          className={`btn${dis}`}
          onClick={() => {
            console.log("회원 탈퇴 클릭!");
          }}
          disabled={dis}
        >
          탈퇴하기
        </button>
      </div>
    </Layout>
  );
};

export default Drop;
