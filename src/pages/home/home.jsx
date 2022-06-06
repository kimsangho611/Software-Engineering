import "./home.css";
import { Layout } from "../../components/layout";
import ProductBlock from "../../components/common/productBlock";
import ClothesImg from "../../assets/samples/product.png";

const Home = () => {
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
            <ProductBlock
              img={ClothesImg}
              like={"1200"}
              firstCate={"WOMEN"}
              secondCate={"니트"}
              title={"한 번 입은 니트 판매합니다!!"}
              view={"1200"}
              price={"12000"}
            />
            <ProductBlock
              img={ClothesImg}
              like={"1200"}
              firstCate={"WOMEN"}
              secondCate={"니트"}
              title={"한 번 입은 니트 판매합니다!!"}
              view={"1200"}
              price={"12000"}
            />
            <ProductBlock
              img={ClothesImg}
              like={"1200"}
              firstCate={"WOMEN"}
              secondCate={"니트"}
              title={"한 번 입은 니트 판매합니다!!"}
              view={"1200"}
              price={"12000"}
            />
            <ProductBlock
              img={ClothesImg}
              like={"1200"}
              firstCate={"WOMEN"}
              secondCate={"니트"}
              title={"한 번 입은 니트 판매합니다!!"}
              view={"1200"}
              price={"12000"}
            />
          </div>
        </section>
        <section className="hotNewItem">
          <div className="homeTitle">
            <span className="mainTitle">NEW ITEM</span>
            <span className="smallTitle">
              새로 올라온 아이템들을 만나보세요
            </span>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
