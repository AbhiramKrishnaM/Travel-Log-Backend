require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const middleware = require("./middleware");
// Api
const logs = require("./api/logs");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.use("/api/logs", logs);

// not found middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application running at port ${port}`);
});
