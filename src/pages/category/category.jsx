import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout";
import "./category.css";
import ProductBlock from "../../components/common/productBlock";
import { useEffect, useState } from "react";
import { SelectBox } from "../../components/category/selectBox";
import { SearchModal } from "../../components/modals/searchModal";
import { GetCategoryListApi } from "../../core/api/category/getCategoryList";

const ViewCategory = () => {
  const params = useParams();
  const [order, setOrder] = useState(1);
  const [list, setList] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log(list);
  }, [list]);

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    const res = await GetCategoryListApi(order, min, max, params.c1, params.c2);
    setList(res.list);
  };

  return (
    <Layout>
      <div className="category">
        {openModal ? (
          <SearchModal
            order={order}
            setOrder={setOrder}
            min={min}
            setMin={setMin}
            max={max}
            setMax={setMax}
            setOpenModal={setOpenModal}
            setList={setList}
          />
        ) : (
          <></>
        )}
        <div className="cate">
          <div className="cate">{`${params.c1} > ${params.c2} (${list.length})건`}</div>
          <button className="openBtn" onClick={() => setOpenModal(true)}>
            정렬
          </button>
        </div>
        <section className="list">
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
        </section>
      </div>
    </Layout>
  );
};

export default ViewCategory;
