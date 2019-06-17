const sharp = require('sharp')
const fs = require('fs')
module.exports.uploadFile = {
  conf: {
    handler: uploadFile,
    insecure: true
  },
  method: 'POST'
}

function uploadFile (req, res) {
  let path = req.file && req.file.path ? req.file.path : null
  sharp(req.file.path).resize(300, 300).toBuffer(function(err, buf) {
    if (err)  return console.log(err)
    
    fs.writeFile(__dirname + '/../image/' + req.file.filename, buf, function (err) {
      if (err) {
        return console.log(err);
      }
    })
  })
  return res.status(200).json({'success': true, data: path})
}
