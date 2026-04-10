import express from "express";
const router = express.Router();

router.get("/health", (req,res) => {
  res.json({
    status: "OK",
    message: "Success",
    status: "ok",
    options: null,
  });
});

export default router;
