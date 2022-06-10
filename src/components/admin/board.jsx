import { deletePosting } from "../../core/api/admin/manage";
import styles from "./board.module.scss";
export const BoardLine = ({ list, cnt, posting }) => {
  const keys = Object.keys(list);
  const value = [];
  for (let i = 0; i < cnt; i++) {
    value[i] = list[keys[i]];
  }

  const HandlerForDelete = ({ pid }) => {
    return (
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={async () => {
          const res = await deletePosting(pid);
          if (res === 200) {
            alert("삭제되었습니다.");
            window.location.href = "/admin/manage/posting";
          } else alert("오류가 발생하였습니다. 관리자에게 문의하세요.");
        }}
      >
        삭제
      </button>
    );
  };

  const HandlerForInquire = ({ pid }) => {
    return (
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={async () => {
          window.location.href = `/product/detail/${pid}`;
        }}
      >
        조회
      </button>
    );
  };

  return (
    <div className={styles.boardLine}>
      {value.map((data, i) => {
        return (
          <span key={i} style={{ width: `${100 / cnt}%` }}>
            {i === 4 && posting ? (
              <HandlerForInquire pid={list.p_id} key={i} />
            ) : i === 5 && posting ? (
              <HandlerForDelete pid={list.p_id} key={i} />
            ) : (
              data
            )}
          </span>
        );
      })}
    </div>
  );
};
