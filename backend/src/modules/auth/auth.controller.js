import fileUploadSvc from "../../service/fileupload.service.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = req.body;
      let profileImage = null;

      if (req.file?.path) {
        profileImage = await fileUploadSvc.uploadFile(req.file.path, "/users");
      }

      res.json({
        data: {
          ...data,
          profileImage,
        },
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
