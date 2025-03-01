import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const cloudinaryUploader = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, { timeout: 120000, folder: "product" });
};
