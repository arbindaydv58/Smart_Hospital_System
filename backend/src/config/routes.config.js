import express from "express";
const router = express.Router();

router.get("/health", (req,res) => {
  res.json({
    message: "Success",
    status: "ok",
    data: null,
  });
});

export default router;
