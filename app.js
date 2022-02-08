const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const { connectdb } = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 3001;

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectdb(process.env.MONGO_URI);
    console.log("CONNECTED TO THE DB ..");
    app.listen(port, console.log(`Server running on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
