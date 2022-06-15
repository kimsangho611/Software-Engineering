import { useState, useEffect } from "react";
import { IC_Plus_Circle } from "../assets/icons";
import { OrangeBtn } from "../components/common/button";
import { Layout } from "../components/layout";
import { FailModal, SuccessModal } from "../components/modals/resultModal";
import { ProductRegisterBox } from "../components/productDetail/productRegisterBox";
import { productRegister } from "../core/api/product/productRegister";
import { CheckEmptyInputExists } from "../utils/checkInputs";
import styles from "./productRegister.module.scss";

const ProductRegister = () => {
  const [success, setSuccess] = useState("");
  const [dis, setDis] = useState(true);
  const [err, setErr] = useState("");
  const [userInput, setUserInput] = useState({
    imgPicker: "",
    cate1: "WOMEN",
    cate2: "아우터",
    title: "",
    price: "",
    originPrice: "",
    size: "",
    state: "새 상품",
    wearCnt: 0,
    pollution: null,
    introduction: "",
  });

  const category1 = ["WOMEN", "MEN", "ACC"];
  const forWomen = [
    "아우터",
    "니트",
    "셔츠",
    "티셔츠",
    "원피스",
    "팬츠",
    "스커트",
  ];
  const forMen = ["아우터", "니트", "셔츠", "티셔츠", "팬츠"];
  const forAcc = ["가방", "지갑", "신발", "기타 잡화"];
  const [category2, setCategory2] = useState(forWomen);
  useEffect(() => {
    if (userInput.cate1 == "WOMEN") {
      setUserInput((prev) => ({ ...prev, cate2: "아우터" }));
      setCategory2(forWomen);
    } else if (userInput.cate1 == "MEN") {
      setUserInput((prev) => ({ ...prev, cate2: "아우터" }));
      setCategory2(forMen);
    } else {
      setUserInput((prev) => ({ ...prev, cate2: "가방" }));
      setCategory2(forAcc);
    }
  }, [userInput.cate1]);

  useEffect(() => {
    if (userInput.state === "새 상품")
      setUserInput((prev) => ({ ...prev, wearCnt: 0, pollution: null }));
  }, [userInput.state]);

  useEffect(() => {
    const empty = CheckEmptyInputExists(userInput);
    if (empty) {
      setDis(true);
      setErr("빈 칸을 모두 채워주세요.");
    } else if (isNaN(userInput.price) || isNaN(userInput.originPrice)) {
      setDis(true);
      setErr("가격은 숫자로 이뤄져야 합니다.");
    } else {
      setDis(false);
      setErr("");
    }
  }, [userInput]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setUserInput((prev) => ({ ...prev, imgPicker: reader.result }));
        resolve();
      };
    });
  };

  return (
    <Layout otherClass={styles.productRegister}>
      {success === true ? (
        <SuccessModal text={"상품 등록"} btnText={"홈으로"} linkTo={"/"} />
      ) : success === false ? (
        <FailModal
          text={"상품 등록"}
          btnText={"다시 시도"}
          linkTo={"/product/register"}
        />
      ) : (
        <></>
      )}
      <div className={styles.putInfos}>
        <input
          className={styles.imgInput}
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
          id="imgPicker"
          name="imgPicker"
        />
        <label htmlFor="imgPicker" className={styles.imagePicker}>
          {userInput.imgPicker ? (
            <img
              src={userInput.imgPicker}
              alt="preview-img"
              className={styles.imagePicker}
            />
          ) : (
            <div className={styles.noImg}>
              <IC_Plus_Circle />
              <span>상품 이미지를 등록해주세요.</span>
            </div>
          )}
        </label>
        <div className={styles.textInputs}>
          <div className={styles.alignRow}>
            <ProductRegisterBox
              type={1}
              text={"카테고리1"}
              options={category1}
              other={styles.half}
              onChange={(e) =>
                setUserInput({ ...userInput, cate1: e.target.value })
              }
            />
            <ProductRegisterBox
              type={1}
              text={"카테고리2"}
              options={category2}
              other={styles.half}
              onChange={(e) =>
                setUserInput({ ...userInput, cate2: e.target.value })
              }
            />
          </div>
          <ProductRegisterBox
            type={2}
            text={"제목"}
            onChange={(e) =>
              setUserInput({ ...userInput, title: e.target.value })
            }
          />
          <ProductRegisterBox
            type={2}
            text={"가격"}
            onChange={(e) =>
              setUserInput({ ...userInput, price: e.target.value })
            }
          />
          <ProductRegisterBox
            type={2}
            text={"정가"}
            onChange={(e) =>
              setUserInput({ ...userInput, originPrice: e.target.value })
            }
          />
          <ProductRegisterBox
            type={2}
            text={"사이즈"}
            onChange={(e) =>
              setUserInput({ ...userInput, size: e.target.value })
            }
          />
          <ProductRegisterBox
            type={1}
            text={"상품 상태"}
            options={["새 상품", "중고"]}
            onChange={(e) =>
              setUserInput({ ...userInput, state: e.target.value })
            }
          />
          {userInput.state === "중고" && (
            <div className={styles.alignRow}>
              <ProductRegisterBox
                type={2}
                text={"실착 횟수"}
                other={styles.half}
                onChange={(e) =>
                  setUserInput({ ...userInput, wearCnt: e.target.value })
                }
              />
              <ProductRegisterBox
                type={2}
                text={"오염 여부"}
                other={styles.half}
                onChange={(e) =>
                  setUserInput({ ...userInput, pollution: e.target.value })
                }
              />
            </div>
          )}
          <ProductRegisterBox
            type={3}
            text={"상품 설명"}
            onChange={(e) =>
              setUserInput({ ...userInput, introduction: e.target.value })
            }
          />
        </div>
      </div>
      <span className={styles.errMsg}>{err}</span>
      <OrangeBtn
        text={"등록"}
        onClick={async () => {
          const res = await productRegister(userInput);
          if (res.status == 200) {
            setSuccess(true);
            console.log(res);
          } else {
            setSuccess(false);
            console.log(res);
          }
        }}
        dis={dis}
      />
    </Layout>
  );
};

export default ProductRegister;
