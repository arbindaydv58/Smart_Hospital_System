import { v2 as cloudinary } from "cloudinary";
import { CloudinaryConfig } from "../config/config.js";

class CloudinaryService {
  //*config
  constructor() {
    cloudinary.config({
      cloud_name: CloudinaryConfig.cloudName,
      api_key: CloudinaryConfig.apikey,
      api_secret: CloudinaryConfig.apiSecret,
    });
  }
}
