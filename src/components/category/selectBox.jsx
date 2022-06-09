import "./selectBox.css";

const OPTIONS = [
  { value: 1, name: "최근 등록 순" },
  { value: 2, name: "조회수 많은 순" },
];

export const SelectBox = ({ setOrder, order }) => {
  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <select className="alignbox" onChange={handleChange}>
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export const SelectPriceBox = ({ min, setMin, max, setMax }) => {
  return (
    <div className="selectPriceBox">
      <input
        type={"text"}
        className="pricebox"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <span className="text">원</span>
      <span className="text">{`  ~   `}</span>
      <input
        type={"text"}
        className="pricebox"
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />
      <span className="text">원</span>
    </div>
  );
};
