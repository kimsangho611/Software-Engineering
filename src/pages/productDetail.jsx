import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout";
import styles from "./productDetail.module.scss";
import { IC_Heart, IC_Siren } from "../assets/icons";
import { OrangeBtn } from "../components/common/button";
import { ProductInfoLine } from "../components/productDetail/productInfoLine";
import { ReportModal } from "../components/modals/reportModal";
import {
  BuyModal,
  BuySuccessModal,
  BuyFailModal,
} from "../components/modals/buyModal";
import { amISeller, getProductDetail } from "../core/api/product/detail";
import { useNavigate, useParams } from "react-router-dom";
import { hit } from "../core/api/product/hit";
import { ReportApi } from "../core/api/auth/reportApi";
import { buyWithPoint } from "../core/api/point/dealWithPoint";
import { CancleLike, productLike } from "../core/api/product/like";
import { getComments, writeCommentAsBuyer } from "../core/api/product/comment";
import {
  ProductComment,
  ProductReply,
} from "../components/productDetail/comment";
import { ProductDelete } from "../core/api/product/editAndDelete";

const ProductDetail = () => {
  const [like, setLike] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [buySucModal, setBuySucModal] = useState(false);
  const [buyFailModal, setBuyFailModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const params = useParams();
  const [detail, setDetail] = useState("");
  const [report, setReport] = useState({ title: "", content: "" });
  const [comment, setComment] = useState("");
  const [write, setWrite] = useState("");
  const [seller, setSeller] = useState(false);
  const [sellerId, setSellerId] = useState("");

  const navigate = useNavigate();

  const fetch = async () => {
    await hit(params.pid);
    const res = await getProductDetail(params.pid);
    const seller = res.seller[0];
    setSellerId(seller[0]);
    console.log("seller=", res.seller);
    setDetail(res.list);
    setLike(res.isLike);
    const res2 = await amISeller(params.pid);
    setSeller(res2.data.result);
  };

  useEffect(() => {
    console.log("detail=", detail);
  }, [detail]);

  useEffect(() => {
    if (params.pid != undefined && params.pid != null) fetch();
  }, [params]);

  useEffect(() => {
    const fetch = async () => {
      const comm = await getComments(params.pid);
      setComment(comm.list);
    };
    fetch();
  }, []);

  const reportClick = async () => {
    const res = await ReportApi(report.title, report.content, params.pid);
    setReportModal(false);
    if (res == 200) alert("????????? ?????????????????????.");
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
      <div className={styles.topBlock}>
        <div className={styles.productImg}>
          <img src={detail.p_image} className={styles.productImg} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.categoryInfo}>
            <span
              className={styles.category}
            >{`${detail.p_category1} > ${detail.p_category2}`}</span>
            {seller ? (
              <button
                type="button"
                onClick={() => navigate(`/product/detail/${params.pid}/edit`)}
              >
                ????????????????
              </button>
            ) : (
              <button type="button" onClick={() => setReportModal(true)}>
                <IC_Siren width={26} height={26} />
                ????????????
              </button>
            )}
          </div>
          <h1>{detail.p_title}</h1>
          <div className={styles.dealInfo}>
            <strong className={styles.status}>{detail.p_trade}</strong>
            <strong className={styles.price}>
              {detail.p_price?.toLocaleString("ko-KR")}
              <span>???</span>
            </strong>
          </div>
          <div className={styles.line} />
          <div className={styles.postInfo}>
            <div>
              <span>
                <IC_Heart />
                {detail.likecnt}
              </span>
              <span>????????? {detail.p_view}???</span>
            </div>
            <span>?????? ????????? {detail.p_date?.substr(0, 10)}</span>
          </div>
          <Link to={`/seller/${sellerId.User_u_id}`}>
            <button type="button" className={styles.sellerInfo}>
              <span>????????? ?????? ??????</span>
            </button>
          </Link>
          <div className={styles.infos}>
            <ProductInfoLine
              title={"??????"}
              content={`${detail.p_listprice?.toLocaleString("ko-KR")}???`}
            />
            <ProductInfoLine title={"?????????"} content={detail.p_size} />
            <ProductInfoLine title={"?????? ??????"} content={detail.p_status} />
            <ProductInfoLine
              title={"?????? ??????"}
              content={`${detail.p_puton_count}???`}
            />
            <ProductInfoLine
              title={"?????? ??????"}
              content={detail.p_dirty === "null" ? "??????" : detail.p_dirty}
            />
            <ProductInfoLine title={"?????? ??????"} content={detail.p_contents} />
          </div>
          {seller ? (
            <div className={styles.btns}>
              <OrangeBtn
                text={"?????? ??????"}
                dis={detail.p_trade === "?????????" ? false : true}
                onClick={async () => {
                  const res = await ProductDelete(params.pid);
                  res.success
                    ? window.location.replace("/")
                    : alert("????????? ??????????????????. ?????? ??????????????????.");
                }}
              />
            </div>
          ) : (
            <div className={styles.btns}>
              <OrangeBtn
                text={"?????? ??????"}
                onClick={() => setBuyModal((prev) => !prev)}
                dis={detail.p_trade === "?????????" ? false : true}
              />
              <button
                type="button"
                className={styles.whiteBtn}
                onClick={async () => {
                  if (like === 0) {
                    await productLike(params.pid);
                    window.location.reload();
                  } else {
                    await CancleLike(params.pid);
                    window.location.reload();
                  }
                }}
              >
                <IC_Heart
                  className={
                    like === 1 ? styles.heartFill : styles.heartNotFill
                  }
                />
                ???
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.productQ}>
        {!seller && (
          <>
            <textarea
              placeholder="?????? ????????? ???????????????."
              onChange={(e) => setWrite(e.target.value)}
            ></textarea>
            <button
              type="button"
              onClick={async () => {
                const res = await writeCommentAsBuyer(params.pid, write);
                if (res === 200) {
                  alert("????????? ?????????????????????.");
                  window.location.reload();
                } else {
                  alert("????????? ???????????? ???????????????. ??????????????? ???????????????.");
                }
              }}
            >
              <span>??????</span>
            </button>
          </>
        )}

        {comment.length != 0 &&
          comment.map((data, i) => {
            return (
              <Fragment key={i}>
                <ProductComment data={data} seller={seller} />
                {data.pi_answer !== null && (
                  <ProductReply data={data.pi_answer} />
                )}
              </Fragment>
            );
          })}
      </div>
    </Layout>
  );
};

export default ProductDetail;
