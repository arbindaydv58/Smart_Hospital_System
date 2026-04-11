import express from "express";
import authCtrl from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authCtrl.registerUser);

export default authRouter;
