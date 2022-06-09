import { OrangeBtn, WhiteBtn } from "../common/button";
import { Modal } from "../common/modal";
import styles from "./modals.module.scss";
import { Link, useParams } from "react-router-dom";
import { SelectBox, SelectPriceBox } from "../category/selectBox";
import { GetCategoryListApi } from "../../core/api/category/getCategoryList";
import { useEffect } from "react";

export const SearchModal = ({
  order,
  setOrder,
  min,
  setMin,
  max,
  setMax,
  setOpenModal,
  setList,
}) => {
  const params = useParams();

  const GetCategoryList = async () => {
    const res = await GetCategoryListApi(order, min, max, params.c1, params.c2);
    setList(res.list);
  };

  return (
    <Modal otherStyle={styles.searchModal} prevent={true}>
      <div className={styles.whole}>
        <div className={styles.two}>
          <div className={styles.one}>
            <h1>정렬 기준</h1>
            <SelectBox order={order} setOrder={setOrder} />
          </div>
          <div className={styles.one}>
            <h1>가격 기준</h1>
            <SelectPriceBox
              min={min}
              setMin={setMin}
              max={max}
              setMax={setMax}
            />
          </div>
        </div>
        <OrangeBtn
          otherStyle={styles.searchBtn}
          text={"검색 기준 설정"}
          onClick={async () => {
            await GetCategoryList();
            setOpenModal(false);
          }}
        />
      </div>
    </Modal>
  );
};
