const express = require('express');
const multer = require('multer')
const moment = require('moment')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './image')
  },

  filename: function (req, file, cb) {
    let date = moment(moment.now()).format('YYYYMMDDHHMMSS')
    cb(null, date + '_' + file.originalname.replace(/-/g, '_').replace(/ /g, '_'))
  }
})

let upload = multer({ storage: storage })
const router = express.Router();
const register = require('../apis/register.js') 
router.post('/register', jsonParser, register.register.conf.handler)
const uploadFile = require('../apis/uploadFile.js')
router.post('/uploadFile',urlencodedParser, upload.single('file'), uploadFile.uploadFile.conf.handler)
const validateUniqueCode = require('../apis/validateUniqueCode.js') 
router.post('/validateUniqueCode',jsonParser, validateUniqueCode.validateUniqueCode.conf.handler)
module.exports = router
