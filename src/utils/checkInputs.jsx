const CheckEmptyInputExists = (obj) => {
  const keys = Object.keys(obj);
  const value = [];
  for (let i = 0; i < keys.length; i++) {
    value[i] = obj[keys[i]];
  }
  const empty = value.filter((i) => i === "");
  if (empty.length === 0) return false;
  else return true;
};

export { CheckEmptyInputExists };
