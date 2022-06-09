import { IC_Down, IC_Up } from "../../assets/icons";
import styles from "./mypage.module.scss";

export const MypagePointLine = ({ pointInfo }) => {
  return (
    <div className={styles.mypagePointLine}>
      <h1 className={styles.title}>{pointInfo.point_title}</h1>
      <strong
        className={
          parseInt(pointInfo.point_amount) > 0
            ? styles.pointAdd
            : styles.pointSub
        }
      >
        {parseInt(pointInfo.point_amount) > 0
          ? `+${pointInfo.point_amount}`
          : pointInfo.point_amount}
        <span> point</span>
      </strong>
    </div>
  );
};

export const MypageAskLine = ({ askInfo, setOpen, open }) => {
  return (
    <>
      <div
        className={styles.mypageAskLine}
        onClick={() => {
          setOpen((prev) => ({ ...prev, [askInfo.q_id]: !open[askInfo.q_id] }));
        }}
      >
        <h1 className={styles.title}>{askInfo.q_title}</h1>
        <div className={styles.rightSide}>
          <div
            className={
              askInfo.q_answer !== null ? styles.orangeTag : styles.greyTag
            }
          >
            <span>{askInfo.q_answer !== null ? "답변 완료" : "답변 대기"}</span>
          </div>
          {open[askInfo.q_id] ? (
            <IC_Up className={styles.arrow} />
          ) : (
            <IC_Down className={styles.arrow} />
          )}
        </div>
      </div>
      {open[askInfo.q_id] && (
        <div className={styles.contents}>
          <div className={styles.userQ}>{askInfo.q_contents}</div>
          {askInfo.isAnswer && (
            <>
              <div className={styles.line} />

              <div className={styles.adminA}>
                <span className={styles.admin}>관리자</span>
                <span className={styles.answer}>
                  {askInfo.q_answer === null ? "" : askInfo.q_answer}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
