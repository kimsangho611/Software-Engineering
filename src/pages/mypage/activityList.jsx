import { useEffect, useState } from "react";
import ProductBlock from "../../components/common/productBlock";
import { Layout } from "../../components/layout";
import { GetActivityApi } from "../../core/api/mypage/getActivity";
import styles from "./list.module.scss";

const MyPageActivityList = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [order, setOrder] = useState(1);
  const OPTIONS = [
    { value: 1, name: "찜한 게시물" },
    { value: 2, name: "댓글 단 게시물" },
  ];
  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  const GetProductInfo = async () => {
    const res = await GetActivityApi(order);
    setProductInfo(res.result);
  };

  useEffect(() => {
    GetProductInfo();
  }, [order]);

  return (
    <Layout otherClass={styles.mypageBuyList}>
      <h1 className={styles.title}>활동 목록</h1>
      <div className={styles.activitySelect}>
        <select onChange={handleChange}>
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hotNewItem">
        <div className="productOneLine">
          {productInfo?.map((item, key) => {
            return (
              <ProductBlock
                key={key}
                id={item?.p_id}
                img={item?.p_image}
                like={String(item?.likecnt)}
                firstCate={item?.p_category1}
                secondCate={item?.p_category2}
                title={item?.p_title}
                view={String(item?.p_view)}
                price={item?.p_price}
                state={item?.p_trade}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MyPageActivityList;
