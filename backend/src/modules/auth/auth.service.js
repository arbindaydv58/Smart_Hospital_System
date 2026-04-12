import bcrypt from "bcryptjs";
import fileUploadSvc from "../../service/fileupload.service.js";
import AuthRepo from "./auth.respository.js";
import {
  normalizeRole,
  randomStringGenerate,
} from "../../utilities/helpers.js";
import { UserStatus } from "@prisma/client";

class UserService {
  async transformUserRegister(req) {
    try {
      const data = req.body;

      const userExit = await AuthRepo.findUserByEmail(data.email);

      if (userExit) {
        throw { statusCode: 400, message: "email aready exits" };
      }

      if (req.file) {
        data.profileImage = await fileUploadSvc.uploadFile(
          req.file.path,
          "/users",
        );
      }

      data.role = normalizeRole(data.role);
      data.password = await bcrypt.hash(data.password, 10);
      data.activationToken = randomStringGenerate(150);
      data.tokenExpiry = new Date(Date.now() + 360000);
      data.status = UserStatus.INACTIVE;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async registerUser(data) {
    try {
      const user = await AuthRepo.createUser(data);
      return user;
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
  return prisma
  .user.findFirst({
    where: filter,
  });
}

  //* Public Profile
  getPublicUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      image: user?.profileImage?.thumbUrl,
    };
  }
}

const AuthSvc = new UserService();
export default AuthSvc;
