const express = require('express');
const multer  = require('multer');
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './api/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.originalname + '-' + uniqueSuffix + '.' + extension)
    }
  })
  
const upload = multer({ storage: storage })
module.exports = upload