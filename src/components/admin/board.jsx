import { Link, useParams } from "react-router-dom";
import styles from "./board.module.scss";
export const BoardLine = ({ list }) => {
  const keys = Object.keys(list);
  const value = [];
  for (let i = 0; i < keys.length; i++) {
    value[i] = list[keys[i]];
    if (value[i] === null) value[i] = "답변 요청";
  }

  return (
    <Link to={"/manage/inquiry/"}>
      <div className={styles.boardLine}>
        {value.map((data, i) => (
          <span key={i}>{data}</span>
        ))}
      </div>
    </Link>
  );
};
