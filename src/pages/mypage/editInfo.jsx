import styles from "./editInfo.module.scss";
import { Layout } from "../../components/layout";
import { useEffect, useState } from "react";
import { emailValidation, phoneValidation } from "../../utils/validation";
import { EditInfoApi, GetInfoApi } from "../../core/api/auth/editInfoApi";

const EditInfo = () => {
  const [user, setUser] = useState({
    email: "email@email.com",
    pw: "",
    newPw: "",
    newPwConfirm: "",
    name: "김지수",
    phone: "010-0000-0000",
  });

  const [err, setErr] = useState({
    dis: true,
    msg: "빈칸을 모두 채워주세요.",
  });

  const GetOldInfo = async () => {
    const res = await GetInfoApi();
    console.log("Res", res);
    setUser({
      ...user,
      email: res.info[0].u_email,
      name: res.info[0].u_name,
      phone: res.info[0].u_phone,
    });
  };
  useEffect(() => {
    GetOldInfo();
  }, []);

  useEffect(() => {
    if (
      user.email === "" ||
      user.pw === "" ||
      user.newPw === "" ||
      user.newPwConfirm === "" ||
      user.name === "" ||
      user.phone === ""
    ) {
      setErr({ dis: true, msg: "빈칸을 모두 채워주세요." });
    } else if (user.newPw !== user.newPwConfirm) {
      setErr({
        dis: true,
        msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      });
    } else if (!emailValidation(user.email)) {
      setErr({
        dis: true,
        msg: "이메일 형식이 올바르지 않습니다.",
      });
    } else if (!phoneValidation(user.phone)) {
      setErr({
        dis: true,
        msg: "핸드폰 번호 형식은 010-0000-0000입니다.",
      });
    } else {
      setErr({ dis: false, msg: "" });
    }
  }, [user]);

  return (
    <Layout otherClass={styles.editInfo}>
      <h1>내 정보 수정</h1>
      <input
        type={"email"}
        value={user.email}
        placeholder={"이메일"}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type={"password"}
        value={user.pw}
        placeholder={"현재 비밀번호"}
        onChange={(e) => setUser({ ...user, pw: e.target.value })}
      />
      <input
        type={"password"}
        value={user.newPw}
        placeholder={"변경할 비밀번호"}
        onChange={(e) => setUser({ ...user, newPw: e.target.value })}
      />
      <input
        type={"password"}
        value={user.newPwConfirm}
        placeholder={"변경할 비밀번호 확인"}
        onChange={(e) => setUser({ ...user, newPwConfirm: e.target.value })}
      />
      <input
        type={"text"}
        value={user.name}
        placeholder={"이름"}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type={"text"}
        value={user.phone}
        placeholder={"휴대전화"}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <h3>{err.msg}</h3>
      <button
        type="button"
        disabled={err.dis}
        className={err.dis ? styles.dis : styles.ok}
        onClick={async () => {
          const res = await EditInfoApi(
            user.email,
            user.pw,
            user.newPw,
            user.name,
            user.phone
          );
          if (res.success) {
            window.location.replace("/mypage/editInfo");
          } else {
            alert(res.msg);
          }
        }}
      >
        변경하기
      </button>
    </Layout>
  );
};

export default EditInfo;
