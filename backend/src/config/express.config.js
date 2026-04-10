import express from "express";
import router from "./routes.config.js";
import cors from "cors";
const app = express();

//*Parsers body
//Json
app.use(express.json());
//x-www-from-urlencode()
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//*Routes
app.use("/api/v1", router);

app.use((req, res, next) => {
  next({
    code: 404,
    message: "Response not Found...",
    status: "NOT_FOUND_ERR",
  });
});

app.use((error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let details = error.details || null;
  let msg = error.message || "Internal server Error...";
  let status = error.status || "SERVER_ERROR";

  res.status(statusCode).json({
    error: details,
    message: msg,
    status: status,
    Option: null,
  });
});

export default app;
