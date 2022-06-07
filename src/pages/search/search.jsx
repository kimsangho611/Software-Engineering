import { Layout } from "../../components/layout";
import "./search.css";
import { SearchBar } from "../../components/search/searchBar";
import { useState } from "react";
import ProductBlock from "../../components/common/productBlock";
import ClothesImg from "../../assets/samples/product.png";
import { useParams } from "react-router-dom";
const Search = () => {
  const params = useParams();
  const [searchString, setSearchString] = useState(params.word);
  const [list, setList] = useState([]);
  return (
    <Layout>
      <section className="search">
        <SearchBar value={searchString} setValue={setSearchString} />
        <span className="result">{`'${params.word}'에 관한 검색결과 (${list.length})건`}</span>
        {list.length != 0 ? (
          <div className="productOneLine">
            <ProductBlock
              img={ClothesImg}
              like={"1200"}
              firstCate={"WOMEN"}
              secondCate={"니트"}
              title={"한 번 입은 니트 판매합니다!!"}
              view={"1200"}
              price={"12000"}
              state={"판매 완료"}
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
              state={"거래 중"}
            />
          </div>
        ) : (
          <div className="no">
            <span className="nocontents">텅...</span>
            <span className="noexplain">
              -단어의 철자가 정확한지 확인해 보세요.{"\n"}
              -보다 일반적인 검색어로 다시 검색해 보세요.{"\n"}
              -검색어의 띄어쓰기를 다르게 해보세요.{"\n"}
              -유해/금지어가 아닌지 확인해주세요.
            </span>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Search;
