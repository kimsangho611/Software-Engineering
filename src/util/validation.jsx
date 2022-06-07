export const PhoneValidation = (tel) => {
  return /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(tel);
};

export const EmailValidation = (email) => {
  return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
    email
  );
};

export const NameValidation = (name) => {
  return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(name);
};
