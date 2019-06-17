const fs = require('fs')
module.exports.validateUniqueCode = {
  conf: {
    handler: validateUniqueCode,
    insecure: true
  },
  method: 'POST'
}
function validateUniqueCode (req, reply) {
  let code = req.body.code || null
  if (!code)
    return reply.status(500).send({success: false, message: 'request paramenter code missng'})
  if (checkInCsv(code)) {
    return reply.status(200).send({success: true, message: 'valid'})
  } else {
    return reply.status(500).send({success: false, message: 'Code not found'})
  }
}

function checkInCsv (code) {
  let csv = fs.readFileSync('./code.csv').toString().split('\r\n')
  let csvIndex = csv.indexOf(code)
  if (csvIndex === -1) {
    return false
  } else {
    csv.splice(csvIndex, 1)
    fs.writeFile('./code.csv', csv.join('\r\n'))
    return true
  }
}
