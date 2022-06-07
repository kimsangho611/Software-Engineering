// === JWT 토큰 생성 및 해석 ===
// 로그인 용도로 사용됩니다

const jwt = require("jsonwebtoken");
const secretKey = require("../config/token.js").secretKey;
const options = require("../config/token.js").options;

module.exports = {
  sign: async (user) => {
    const payload = {
      id: user.id,
      name: user.name,
    };
    return { token: jwt.sign(payload, secretKey, options) };
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      return 401;
    }
    return decoded;
  },
};
