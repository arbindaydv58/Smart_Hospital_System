import AuthSvc from "./auth.service.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await AuthSvc.transformUserRegister(req);
      const user = await AuthSvc.registerUser(data);

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
}

const authCtrl = new AuthController();

export default authCtrl;
