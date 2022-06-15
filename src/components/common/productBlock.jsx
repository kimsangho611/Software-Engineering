import "./productBlock.css";
import { IC_Heart } from "../../assets/icons";
import { Link } from "react-router-dom";
const ProductBlock = ({
  id,
  img,
  like,
  firstCate,
  secondCate,
  title,
  view,
  price,
  state,
}) => {
  return (
    <Link to={`/product/detail/${id}`} className="productBlock">
      {state === "판매 완료" ? <div className="alreadySell" /> : <></>}
      <div className="imgPart">
        <img className="img" src={`${img}`} alt={"clothes"} />
        <div className="heart">
          <IC_Heart className="heartIcon" />
          <span className="heartNum">
            {like.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
      </div>
      <div className="contentsPart">
        <span className="cateName">{`${firstCate}>${secondCate}`}</span>
        <span className="title">{title}</span>
        <div className="bottom">
          <span className="view">
            {`조회수 ${view
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}회`}
          </span>
          {state === "판매 완료" ||
          state === "거래 중" ||
          state === "확정 대기 중" ? (
            <span className="price">{`${state}`}</span>
          ) : (
            <span className="price">{`${price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductBlock;
