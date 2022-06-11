import styles from "./comment.module.scss";
import { useState } from "react";
import { writeCommentAsSeller } from "../../core/api/product/comment";

export const ProductComment = ({ data, seller }) => {
  const [open, setOpen] = useState(false);
  const [write, setWrite] = useState("");
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.firstLine}>
          <span className={styles.name}>{data.u_name}</span>
          <span className={styles.date}>
            {data.pi_date?.substr(0, 10) + " " + data.pi_date?.substr(11, 8)}
          </span>
        </div>
        <div className={styles.lastLine}>
          <span className={styles.content}>{data.pi_contents}</span>
          {data.pi_answer == null && seller && (
            <button type="button" onClick={() => setOpen(true)}>
              <span>답글 달기</span>
            </button>
          )}
        </div>
      </div>
      {open && (
        <>
          <textarea
            placeholder="문의 내용을 입력하세요."
            onChange={(e) => setWrite(e.target.value)}
          ></textarea>
          <button
            type="button"
            onClick={async () => {
              const res = await writeCommentAsSeller(data.pi_id, write);
              if (res === 200) {
                alert("답변이 등록되었습니다.");
                window.location.reload();
              } else {
                alert("답변이 등록되지 않았습니다. 관리자에게 문의하세요.");
              }
            }}
          >
            <span>등록</span>
          </button>
        </>
      )}
    </>
  );
};

export const ProductReply = ({ data }) => {
  return (
    <div className={styles.reply}>
      <div className={styles.firstLine}>
        <span className={styles.name}>판매자</span>
      </div>
      <div className={styles.lastLine}>
        <span className={styles.content}>{data}</span>
      </div>
    </div>
  );
};
