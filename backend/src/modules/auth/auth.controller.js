class AuthController {
  registerUser = (req, res, next) => {
    try {
      const data = req.body;
      res.json({
        data: data,
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