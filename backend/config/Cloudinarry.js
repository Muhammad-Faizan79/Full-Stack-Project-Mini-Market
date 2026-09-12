import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.Api_Secret,
});

export default cloudinary