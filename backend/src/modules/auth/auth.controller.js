import { randomStringGenerate } from "../../utilities/helpers.js";
import authMailSvc from "./auth.mail.js";
import AuthSvc from "./auth.service.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await AuthSvc.transformUserRegister(req);
      const user = await AuthSvc.registerUser(data);

      //*SMTP Server
      await authMailSvc.notifyUserRegistration(data);

      res.json({
        data: AuthSvc.getPublicUser(user),
        message: "Register success",
        status: "Ok",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Activate user profile
  activateUserProfile = async (req, res, next) => {
    try {
      let token = req.params.token;

      const user = await AuthSvc.getSingleRowByFilter({
        activationToken: token,
      });

      //  user not found
      if (!user) {
        throw {
          statusCode: 422,
          message: "User not found or invalid activation token",
          status: "USER_NOT_FOUND",
        };
      }

      // expired token
      const expiryTime = user.tokenExpiry
        ? new Date(user.tokenExpiry).getTime()
        : null;
      const currentTime = Date.now();

      if (!expiryTime || currentTime > expiryTime) {
        const updatedUser = await AuthSvc.updateUser(user.id, {
          activationToken: randomStringGenerate(150),
          tokenExpiry: new Date(Date.now() + 360000),
        });

        await authMailSvc.notifyUserRegistration(updatedUser);
        return res.json({
          data: null,
          message:
            "Activation token expired. A new activation email has been sent.",
          status: "RE-ACTIVATION_EMAIL_SENT",
          options: null,
        });
      } else {
        const updatedUser = await AuthSvc.updateUser(user.id, {
          activationToken: null,
          tokenExpiry: null,
          status: "ACTIVE",
        });

        await authMailSvc.notifyUserActivationSuccess(updatedUser);
        return res.json({
          data: null,
          message:
            "Your account has been activated successfully. Please log in to continue.",
          status: "ACTIVATION_SUCCESS",
          options: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };
}

const authCtrl = new AuthController();

export default authCtrl;
