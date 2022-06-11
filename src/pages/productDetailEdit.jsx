import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import styles from "./productDetail.module.scss";
import { IC_Heart, IC_Siren } from "../assets/icons";
import { OrangeBtn } from "../components/common/button";
import { getProductDetail } from "../core/api/product/detail";
import { useParams } from "react-router-dom";
import { CheckEmptyInputExists } from "../utils/checkInputs";
import { ProductEdit } from "../core/api/product/editAndDelete";

const ProductDetailEdit = () => {
  const params = useParams();
  const [detail, setDetail] = useState("");
  const [dis, setDis] = useState(true);
  const [err, setErr] = useState("");

  const fetch = async () => {
    const res = await getProductDetail(params.pid);
    setDetail(res.list);
  };

  useEffect(() => {
    if (params.pid != undefined && params.pid != null) fetch();
  }, [params]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log("detail.p_status", detail.p_status);
    if (detail.p_status != "중고") {
      setDetail({ ...detail, p_dirty: "null", p_puton_count: 0 });
    }
  }, [detail.p_status]);

  useEffect(() => {
    const empty = CheckEmptyInputExists(detail);
    if (empty) {
      setDis(true);
      setErr("빈 칸을 모두 채워주세요.");
    } else if (isNaN(detail.p_price) || isNaN(detail.p_listprice)) {
      setDis(true);
      setErr("가격은 숫자로 이뤄져야 합니다.");
    } else {
      setDis(false);
      setErr("");
    }
  }, [detail]);

  return (
    <Layout otherClass={styles.productDetailLayout}>
      <div className={styles.topBlock}>
        <div className={styles.productImg}>
          <img src={detail.p_image} className={styles.productImg} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.categoryInfo}>
            <span
              className={styles.category}
            >{`${detail.p_category1} > ${detail.p_category2}`}</span>
          </div>
          <input
            type={"text"}
            className={styles.editTitle}
            value={detail.p_title}
            onChange={(e) => setDetail({ ...detail, p_title: e.target.value })}
          />

          <div className={styles.dealInfo}>
            <strong className={styles.status}>{detail.p_trade}</strong>
            <input
              type={"text"}
              className={styles.editPrice}
              value={detail.p_price}
              onChange={(e) =>
                setDetail({ ...detail, p_price: e.target.value })
              }
            />
            <span className={styles.won}>원</span>
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
            <div className={styles.editInfoLine}>
              <span className={styles.infoTitle}>정가</span>
              <input
                type={"text"}
                value={detail.p_listprice}
                className={styles.infoContent}
                onChange={(e) =>
                  setDetail({ ...detail, p_listprice: e.target.value })
                }
              />
            </div>
            <div className={styles.editInfoLine}>
              <span className={styles.infoTitle}>사이즈</span>
              <input
                type={"text"}
                value={detail.p_size}
                className={styles.infoContent}
                onChange={(e) =>
                  setDetail({ ...detail, p_size: e.target.value })
                }
              />
            </div>
            <div className={styles.editInfoLine}>
              <span className={styles.infoTitle}>상품 상태</span>
              <select
                onChange={(e) =>
                  setDetail({ ...detail, p_status: e.target.value })
                }
                defaultValue={detail.p_status}
              >
                <option key={1}>새 상품</option>
                <option key={2}>중고</option>
              </select>
            </div>
            <div className={styles.editInfoLine}>
              <span className={styles.infoTitle}>실착 횟수</span>
              <input
                type={"text"}
                value={detail.p_puton_count}
                className={styles.infoContent}
                onChange={(e) =>
                  setDetail({ ...detail, p_puton_count: e.target.value })
                }
              />
            </div>
            <div className={styles.editInfoLine}>
              <span className={styles.infoTitle}>오염 여부</span>
              <input
                type={"text"}
                value={detail.p_dirty === "null" ? "없음" : detail.p_dirty}
                className={styles.infoContent}
                onChange={(e) =>
                  setDetail({ ...detail, p_dirty: e.target.value })
                }
              />
            </div>

            <div className={styles.editInfoLine}>
              <span className={styles.infoTitle}>상품 설명</span>
              <input
                type={"text"}
                value={detail.p_contents}
                className={styles.infoContent}
                onChange={(e) =>
                  setDetail({ ...detail, p_contents: e.target.value })
                }
              />
            </div>
          </div>
          <span className={styles.errmsg}>
            {err}
            <div className={styles.btns}>
              <OrangeBtn
                text={"수정 완료"}
                dis={dis}
                onClick={async () => {
                  const res = await ProductEdit(detail);
                  res.success
                    ? window.location.replace(`/product/detail/${detail.p_id}`)
                    : alert("수정에 실패했습니다. 관리자에게 문의해주세요.");
                }}
              />
            </div>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailEdit;
