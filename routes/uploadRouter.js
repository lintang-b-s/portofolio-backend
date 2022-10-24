import express from 'express';
import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import {getToken, jwtPassport, verifyUser, verifyAdmin} from "../authenticate.js";
import cloudinary from "cloudinary"
import fs from "fs";
import dotenv from "dotenv";
import path from 'path';
if (process.env.NODE_ENV !== "production") {
const __dirname = path.resolve();
dotenv.config({
    path: path.resolve(__dirname, 'backend/.env')
  })
}

  

const router = express.Router()


// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// })

cloudinary.config({
  cloud_name: "tutorial-lntng",
  api_key: "527882248559533",
  api_secret: "RTXSrXqpaoR-5STxofLERpGTfmk"
})

const upload = multer();

router.post('/upload',verifyUser, verifyAdmin, (req, res) =>{
  try {
      if(!req.files || Object.keys(req.files).length === 0)
          return res.status(400).json({msg: 'No files were uploaded.'})
      
      const file = req.files.file;
      if(file.size > 1024*1024) {
          removeTmp(file.tempFilePath)
          return res.status(400).json({msg: "Size too large"})
      }

      if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
          removeTmp(file.tempFilePath)
          return res.status(400).json({msg: "File format is incorrect."})
      }

      cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "portofolio"}, async(err, result)=>{
          if(err) throw err;

          removeTmp(file.tempFilePath)

          res.json({public_id: result.public_id, url: result.secure_url})
      })


  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
})

// Delete image only admin can use
router.post('/destroy',verifyUser, verifyAdmin, (req, res) =>{
  try {
      const {public_id} = req.body;
      if(!public_id) return res.status(400).json({msg: 'No images Selected'})

      cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
          if(err) throw err;

          res.json({msg: "Deleted Image"})
      })

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  
})


const removeTmp = (path) =>{
  fs.unlink(path, err=>{
      if(err) throw err;
  })
}



export default router;
