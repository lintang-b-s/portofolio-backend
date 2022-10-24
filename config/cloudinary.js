import dotenv from 'dotenv'
import cloudinaryModule from  "cloudinary"
import path from 'path';
if (process.env.NODE_ENV !== "production") {
const __dirname = path.resolve();
dotenv.config({
    path: path.resolve(__dirname, '.env')
  })
}

const cloudinary = cloudinaryModule.v2;



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  
export default cloudinary;
  