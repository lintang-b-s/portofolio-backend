
import multer from "multer";

import { v1 as uuidv1 } from 'uuid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};
const storage = multer.memoryStorage();

const fileUpload = multer({
  limits: 500000,
  storage,
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});
export { fileUpload }