import { useEffect, useState } from "react";
import { AuthInput } from "../../components/auth/authBox";
import { Layout } from "../../components/layout";
import { DropApi } from "../../core/api/auth/dropApi";
import { EmailValidation } from "../../util/validation";
import "./drop.css";

const Drop = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [drop, setDrop] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [dis, setDis] = useState(true);
  useEffect(() => {
    if (email === "" || password === "" || drop === "") {
      setErrmsg("모든 항목을 입력해주세요.");
      setDis(true);
    } else if (!EmailValidation(email)) {
      setErrmsg("올바른 이메일을 입력해주세요.");
      setDis(true);
    } else if (drop != "탈퇴") {
      setErrmsg("탈퇴를 입력해주세요.");
      setDis(true);
    } else {
      setErrmsg("");
      setDis(false);
    }
  }, [drop]);
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
        <span className="errmsg">{errmsg}</span>
        <button
          className={`btn${dis}`}
          onClick={async () => {
            const res = await DropApi(email, password);
            if (res.success) {
              alert(res.msg);
              localStorage.removeItem("accessToken");
              window.location.replace("/");
            } else {
              alert(res.msg);
            }
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
