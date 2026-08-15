const express = require("express");

const cors = require("cors");
const path = require("path");

const helmet = require("helmet");

const compression = require("compression");

const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const errorMiddleware = require("./middlewares/error.middleware");

// const routes = require("./routes");

const adminRoutes = require("./routes/admin/index");
const webRoutes = require("./routes/web/index");

const loggerMiddleware = require("./middlewares/logger.middleware");
const requestIdMiddleware = require("./middlewares/requestId.middleware");

const app = express();

// --------------------------------------------------
// Hostinger reverse proxy
// --------------------------------------------------
app.set("trust proxy", 1);

// --------------------------------------------------
// Security
// --------------------------------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// --------------------------------------------------
// Compression
// --------------------------------------------------
app.use(compression());

// --------------------------------------------------
// CORS
// --------------------------------------------------
app.use(cors());

// --------------------------------------------------
// Body parsers
// --------------------------------------------------
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// --------------------------------------------------
// Logging
// --------------------------------------------------
app.use(morgan("dev"));

// --------------------------------------------------
// Uploads
// --------------------------------------------------

// Production:
// /home/u394996505/public_html/uploads
//
// Local development:
// backend/src/uploads
//
// Hostinger uses the UPLOAD_ROOT environment variable.
// Local development falls back to backend/src/uploads.

const uploadsPath = process.env.UPLOAD_ROOT
  ? path.resolve(process.env.UPLOAD_ROOT)
  : path.resolve(__dirname, "uploads");

console.log("Uploads Path:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));

// --------------------------------------------------
// Rate Limiting
// --------------------------------------------------
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  }),
);

// --------------------------------------------------
// Health check
// --------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NHDC Backend Running",
  });
});

app.use(loggerMiddleware);
// --------------------------------------------------
// API Routes
// --------------------------------------------------
app.use("/api/admin", adminRoutes);

app.use("/api", webRoutes);

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(errorMiddleware);

module.exports = app;
