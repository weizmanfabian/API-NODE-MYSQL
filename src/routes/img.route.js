const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const imgController = require('../controllers/img.controller');

const validate = require('../middleware/img.middleware')

// const { upload } = require('../helpers/filehelper')

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // callBack(null, '../public/imgVentas')     // './public/images/' directory name where save the file
    // callBack(null, path.join(__dirname, '../public/imgVentas'))     // './public/images/' directory name where save the file
    callBack(null, path.join('./public/imgVentas'))     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    let { camp, subCamp } = req.params;
    callBack(null, `${camp}-${subCamp}-${file.fieldname}-${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  }
})

var upload = multer({
  storage: storage
});

router.post('/uploadSingleFile/:camp/:subCamp/', upload.single('img'), imgController.singleFileUpload)

module.exports = router;