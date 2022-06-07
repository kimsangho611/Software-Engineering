module.exports = {
  secretKey: "sEconDHAnd", // 원하는 시크릿 키
  options: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "24h", // 토큰 유효 기간
    issuer: "secondhand", // 발행자
  },
};
