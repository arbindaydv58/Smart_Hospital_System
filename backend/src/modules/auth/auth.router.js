import express from "express";
import authCtrl from "./auth.controller.js";
import uploader from "../../middleware/uploder.middleware.js";
import { RegisterUserDTO } from "./auth.validator.js";
import bodyValidator from "../../middleware/validator.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  uploader("image").single("profileImage"),
  bodyValidator(RegisterUserDTO),
  authCtrl.registerUser,
);

authRouter.get("/activate/:token", authCtrl.activateUserProfile);

export default authRouter;
