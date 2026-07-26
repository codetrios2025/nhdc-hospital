const express = require("express");

const cors = require("cors");
const path = require("path");

const helmet = require("helmet");

const compression = require("compression");

const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const errorMiddleware = require("./middlewares/error.middleware");

const routes = require("./routes");

const adminRoutes = require("./routes/admin/index");
const webRoutes = require("./routes/web");

const loggerMiddleware = require("./middlewares/logger.middleware");
const requestIdMiddleware = require("./middlewares/requestId.middleware");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(compression());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const uploadsPath = path.resolve(__dirname, "uploads");

console.log("Uploads Path:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 200,
  }),
);

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "NHDC Backend Running",
  });
});

app.use("/api/admin", adminRoutes);

app.use("/api", webRoutes);

app.use(loggerMiddleware);

app.use(errorMiddleware);

module.exports = app;
