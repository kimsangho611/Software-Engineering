import "./searchBar.css";
import { IC_Search } from "../../assets/icons";

export const SearchBar = ({ clickHandler, value, setValue }) => {
  return (
    <div className="searchbar">
      <input
        type={"text"}
        className="text"
        value={value}
        placeholder={"검색어를 입력해주세요."}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            clickHandler();
          }
        }}
        name="searchtext"
      />
      <button className="btn" onClick={clickHandler}>
        <IC_Search />
      </button>
    </div>
  );
};
