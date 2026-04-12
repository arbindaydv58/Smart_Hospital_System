import express from "express";
import authCtrl from "./auth.controller.js";
import uploader from "../../middleware/uploder.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  uploader("image").single("profileImage"),
  authCtrl.registerUser,
);

export default authRouter;
