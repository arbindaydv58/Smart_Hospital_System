import express from "express";
import authRouter from "../modules/auth/auth.router.js";
const router = express.Router();

router.get("/health", (req,res) => {
  res.json({
    message: "Success",
    status: "ok",
    data: null,
  });
});

router.use("/auth",authRouter)

export default router;
