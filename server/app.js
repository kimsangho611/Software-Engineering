const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.set("port", 5000);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.use("/", indexRouter);
