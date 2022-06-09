var multer = require("multer");
const mime = require("mime-types");

module.exports = () => {
  var storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/uploads/");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + "." + mime.extension(file.mimetype)); // 파일명 중복 방지를 위해 현재 시간을 파일 이름에 추가
    },
  });
  return multer({ storage: storage });
};
