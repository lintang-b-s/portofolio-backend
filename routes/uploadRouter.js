import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import {getToken, jwtPassport, verifyUser, verifyAdmin} from "../authenticate.js";



const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post(
    '/',
    verifyUser, 
    verifyAdmin,
    upload.single('file'),
    async (req, res) => {
        cloudinary.config({
            cloud_name: "tutorial-lntng",
            api_key: "527882248559533",
            api_secret: "RTXSrXqpaoR-5STxofLERpGTfmk",
            
        });
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              });
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
          };
          const result = await streamUpload(req);
          res.send(result);
        }
      );

export default uploadRouter;
