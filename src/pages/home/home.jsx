import "./home.css";
import { Layout } from "../../components/layout";
import ProductBlock from "../../components/common/productBlock";
import ClothesImg from "../../assets/samples/product.png";
import { HotAndNew } from "../../core/api/product/hotAndNew";
import { useEffect, useState } from "react";

const Home = () => {
  const [hotList, setHotList] = useState([]);
  const [newList, setNewList] = useState([]);

  const GetHotNewList = async () => {
    const res = await HotAndNew();
    console.log(res);
    setHotList(res.hot);
    setNewList(res.new);
  };
  useEffect(() => {
    GetHotNewList();
  }, []);
  return (
    <div>
      <Layout>
        <section className="hotNewItem">
          <div className="homeTitle">
            <span className="mainTitle">HOT ITEM</span>
            <span className="smallTitle">
              세컨드핸드에서 인기있는 아이템들을 만나보세요
            </span>
          </div>
          <div className="productOneLine">
            {hotList.map((item, key) => {
              return (
                <ProductBlock
                  key={key}
                  id={item?.p_id}
                  img={item?.p_image}
                  like={item?.likecnt}
                  firstCate={item?.p_category1}
                  secondCate={item?.p_category2}
                  title={item?.p_title}
                  view={item?.p_view}
                  price={item?.p_price}
                  state={item?.p_trade}
                />
              );
            })}
          </div>
        </section>
        <section className="hotNewItem">
          <div className="homeTitle">
            <span className="mainTitle">NEW ITEM</span>
            <span className="smallTitle">
              새로 올라온 아이템들을 만나보세요
            </span>
          </div>
          <div className="productOneLine">
            {newList.map((item, key) => {
              return (
                <ProductBlock
                  key={key}
                  img={item?.p_image}
                  id={item?.p_id}
                  like={item?.likecnt}
                  firstCate={item?.p_category1}
                  secondCate={item?.p_category2}
                  title={item?.p_title}
                  view={item?.p_view}
                  price={item?.p_price}
                  state={item?.p_trade}
                />
              );
            })}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
