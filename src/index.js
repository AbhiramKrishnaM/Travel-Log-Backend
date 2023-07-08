const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// not found middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl} `);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.statuscode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application running at port ${port}`);
});
