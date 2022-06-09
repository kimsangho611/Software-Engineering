const express = require("express");
const index = require("./routes/index");
const auth = require("./routes/auth");
const product = require("./routes/product");
const main = require("./routes/main");
const search = require("./routes/search");
const point = require("./routes/point");
const mypage = require("./routes/mypage");
const notice = require("./routes/notice");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(cors());
app.set("port", process.env.PORT || 5000);

app.post("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.use("/", index);
app.use("/auth", auth);
app.use("/product", product);
app.use("/main", main);
app.use("/search", search);
app.use("/point", point);
app.use("/mypage", mypage);
app.use("/notice", notice);
