const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const middleware = require("./middleware");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// not found middleware
app.use(middleware.notFound);

app.use(middleware.errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application running at port ${port}`);
});
