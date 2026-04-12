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
        message: "register sucess",
        status: "Ok",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUserProfile = async (req, res, next) => {
    try {
      const token = req.params.token;

      const user = await userSvc.getSingleRowByFilter({
        activationToken: token,
      });

      //  user not found
      if (!user) {
        throw {
          statusCode: 400,
          message: "Invalid or expired activation token",
        };
      }

      // token expired
      if (user.tokenExpiry < new Date()) {
        throw {
          statusCode: 400,
          message: "Activation token has expired",
        };
      }

      // activate user
      await userSvc.updateUser(user.id, {
        status: "INACTIVE",
        activationToken: null,
        tokenExpiry: null,
      });

      res.json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const authCtrl = new AuthController();

export default authCtrl;
