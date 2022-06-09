import styles from "./productInfoLine.module.scss";
import classNames from "classnames";
export const ProductRegisterBox = ({
  type,
  text,
  options,
  other,
  onChange,
}) => {
  //type==1 -> selectBox
  //type==2 -> input
  //type==3 -> textarea
  if (type === 1) {
    return (
      <select
        className={classNames(styles.register_select, other)}
        onChange={onChange}
      >
        {options.map((data, i) => {
          return <option key={i}>{data}</option>;
        })}
      </select>
    );
  } else if (type == 2) {
    return (
      <input
        type="text"
        placeholder={text}
        className={classNames(styles.register_input, other)}
        onChange={onChange}
      />
    );
  } else {
    return (
      <textarea
        placeholder={text}
        className={styles.register_textarea}
        onChange={onChange}
      />
    );
  }
};
