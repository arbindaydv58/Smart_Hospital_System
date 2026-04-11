import { v2 as cloudinary } from "cloudinary";
import { CloudinaryConfig } from "../config/config.js";
import { deleteFile } from "../utilities/helpers.js";

class CloudinaryService {
  //*config
  constructor() {
    cloudinary.config({
      cloud_name: CloudinaryConfig.cloudName,
      api_key: CloudinaryConfig.apikey,
      api_secret: CloudinaryConfig.apiSecret,
    });
  }

  //*FileUpload
  async fileupload(filepath, dir = "/") {
    try {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        filepath,
        {
          unique_filename: true,
          folder: `/shs${dir}`,
        },
      );
      const response = cloudinary.url(public_id, {
        transformation: [{ responsive: true, width: "1024", crop: "scale" }],
      });

      //*delete local file after upload
      await deleteFile(filepath);

      return {
        public_id: public_id,
        url: secure_url,
        thumbUrl: response,
      };
    } catch (exception) {
      console.error(exception);
      throw {
        code: 500,
        message: "file upload error",
        status: "CLOUDINARY_ERR",
      };
    }
  }
}

export default CloudinaryService;
