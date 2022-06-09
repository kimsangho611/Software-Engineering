import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import styles from "./productDetail.module.scss";
import sample from "../assets/samples/product.png";
import { IC_Heart, IC_Siren } from "../assets/icons";
import { OrangeBtn } from "../components/common/button";
import { ProductInfoLine } from "../components/productDetail/productInfoLine";
import { ReportModal } from "../components/modals/reportModal";
import {
  BuyModal,
  BuySuccessModal,
  BuyFailModal,
} from "../components/modals/buyModal";
import { getProductDetail } from "../core/api/product/detail";
import { useParams } from "react-router-dom";
import { hit } from "../core/api/product/hit";
import { ReportApi } from "../core/api/auth/reportApi";
import { buyWithPoint } from "../core/api/point/dealWithPoint";

const ProductDetail = () => {
  const [like, setLike] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [buySucModal, setBuySucModal] = useState(false);
  const [buyFailModal, setBuyFailModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const params = useParams();
  const [detail, setDetail] = useState("");
  const [report, setReport] = useState({ title: "", content: "" });

  const fetch = async () => {
    await hit(params.pid);
    const res = await getProductDetail(params.pid);
    setDetail(res);
  };

  useEffect(() => {
    if (params.pid != undefined && params.pid != null) fetch();
  }, [params]);

  const reportClick = async () => {
    const res = await ReportApi(report.title, report.content, params.pid);
    setReportModal(false);
    if (res == 200) alert("신고가 완료되었습니다.");
  };

  const Buy = async () => {
    const res = await buyWithPoint(params.pid);
    if (res === 200) {
      setBuyModal(false);
      setBuySucModal(true);
      setBuyFailModal(false);
    } else {
      setBuyModal(false);
      setBuySucModal(false);
      setBuyFailModal(true);
    }
  };

  return (
    <Layout otherClass={styles.productDetailLayout}>
      {reportModal && (
        <ReportModal
          setModal={setReportModal}
          setReport={setReport}
          onClick={reportClick}
        />
      )}
      {buyModal && (
        <BuyModal setModal={setBuyModal} price={detail.p_price} onClick={Buy} />
      )}
      {buyFailModal && <BuyFailModal setModal={setBuyFailModal} />}
      {buySucModal && <BuySuccessModal setModal={setBuySucModal} />}

      <div className={styles.productImg}>
        <img src={detail.p_image} className={styles.productImg} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.categoryInfo}>
          <span
            className={styles.category}
          >{`${detail.p_category1} > ${detail.p_category2}`}</span>
          <button type="button" onClick={() => setReportModal(true)}>
            <IC_Siren width={26} height={26} />
            신고하기
          </button>
        </div>
        <h1>{detail.p_title}</h1>

        <div className={styles.dealInfo}>
          <strong className={styles.status}>{detail.p_trade}</strong>
          <strong className={styles.price}>
            {detail.p_price?.toLocaleString("ko-KR")}
            <span>원</span>
          </strong>
        </div>

        <div className={styles.line} />

        <div className={styles.postInfo}>
          <div>
            <span>
              <IC_Heart />
              {detail.likecnt}
            </span>
            <span>조회수 {detail.p_view}회</span>
          </div>
          <span>상품 등록일 {detail.p_date?.substr(0, 10)}</span>
        </div>

        <div className={styles.infos}>
          <ProductInfoLine
            title={"정가"}
            content={`${detail.p_listprice?.toLocaleString("ko-KR")}원`}
          />
          <ProductInfoLine title={"사이즈"} content={detail.p_size} />
          <ProductInfoLine title={"상품 상태"} content={detail.p_status} />
          <ProductInfoLine
            title={"실착 횟수"}
            content={`${detail.p_puton_count}번`}
          />
          <ProductInfoLine
            title={"오염 여부"}
            content={detail.p_dirty === "null" ? "없음" : detail.p_dirty}
          />
          <ProductInfoLine title={"상품 설명"} content={detail.p_contents} />
        </div>

        <div className={styles.btns}>
          <OrangeBtn
            text={"바로 구매"}
            onClick={() => setBuyModal((prev) => !prev)}
            dis={detail.p_trade === "판매중" ? false : true}
          />
          <button
            type="button"
            className={styles.whiteBtn}
            onClick={() => setLike((prev) => !prev)}
          >
            <IC_Heart
              className={like ? styles.heartFill : styles.heartNotFill}
            />
            찜
          </button>
        </div>
      </div>

      <div className={styles.line} />
    </Layout>
  );
};

export default ProductDetail;
