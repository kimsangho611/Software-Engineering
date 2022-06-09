const express = require("express");
const index = require("./routes/index");
const auth = require("./routes/auth");
const product = require("./routes/product");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
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
