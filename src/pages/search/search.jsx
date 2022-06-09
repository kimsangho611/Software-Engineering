import { Layout } from "../../components/layout";
import "./search.css";
import { SearchBar } from "../../components/search/searchBar";
import { useEffect, useState } from "react";
import ProductBlock from "../../components/common/productBlock";
import { useParams } from "react-router-dom";
import { GetAllProduct } from "../../core/api/product/getAllProduct";

const Search = () => {
  const params = useParams();
  const [searchString, setSearchString] = useState(params.word);
  const [list, setList] = useState([]);
  const GetSearchList = async () => {
    const res = await GetAllProduct();
    const filterData = res.list.filter(
      (i) =>
        i.p_title.includes(params.word) ||
        i.p_contents.includes(params.word) ||
        i.p_category1.includes(params.word) ||
        i.p_category2.includes(params.word)
    );
    setList(filterData);
  };
  useEffect(() => {
    GetSearchList();
  }, []);
  return (
    <Layout>
      <section className="search">
        <SearchBar
          value={searchString}
          setValue={setSearchString}
          clickHandler={() =>
            window.location.replace(`/search/${searchString}`)
          }
        />
        <span className="result">{`'${params.word}'에 관한 검색결과 (${list.length})건`}</span>

        {list.length != 0 ? (
          <div className="productOneLine">
            {list.map((item, key) => {
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
