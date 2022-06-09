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
        onClick={() => setOpen((prev) => !prev)}
      >
        <h1 className={styles.title}>{askInfo.inquiryTitle}</h1>
        <div className={styles.rightSide}>
          <div className={askInfo.isAnswer ? styles.orangeTag : styles.greyTag}>
            <span>{askInfo.isAnswer ? "답변 완료" : "답변 대기"}</span>
          </div>
          {open ? (
            <IC_Up className={styles.arrow} />
          ) : (
            <IC_Down className={styles.arrow} />
          )}
        </div>
      </div>
      {open && (
        <div className={styles.contents}>
          <div className={styles.userQ}>{askInfo.inquiryContent}</div>
          {askInfo.isAnswer && (
            <>
              <div className={styles.line} />

              <div className={styles.adminA}>
                <span className={styles.admin}>관리자</span>
                <span className={styles.answer}>{askInfo.adminAnswer}</span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
