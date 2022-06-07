import { useState } from "react";
import "./authBox.css";

export const AuthRadio = () => {
  const [x, setX] = useState("1");
  return (
    <div className="authRadio">
      <label className="authRadioSet">
        <input
          type={"radio"}
          checked={x === "1"}
          value="1"
          onChange={(e) => setX(e.target.value)}
          className="radio"
        />
        <span className="authRadioTypo">고객</span>
      </label>
      <label className="authRadioSet">
        <input
          type={"radio"}
          checked={x === "2"}
          value="2"
          onChange={(e) => setX(e.target.value)}
          className="radio"
        />
        <span className="authRadioTypo">관리자</span>
      </label>
    </div>
  );
};

export const AuthInput = ({ type, name, placeholder, value, setValue }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className="authInputBox"
    />
  );
};
