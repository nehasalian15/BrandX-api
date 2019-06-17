module.exports.register = {
  conf: {
    handler: register,
    insecure: true
  },
  method: 'POST'
}
const fs = require('fs')
const userConfig = require('../db/user.json')
const _ = require('underscore')

function register (req, res) {
  let name = req.body.name
  let email = req.body.email
  let mobile = req.body.mobile
  let address = req.body.address
  let uniqueCode = req.body.uniqueCode
  if (!name || !email || !mobile || !address || !uniqueCode)
    return res.status(500).send({message: 'Invalid Input Data'})

  if (_.findLastIndex(userConfig, { uniqueCode: uniqueCode }) >= 0) {
    return res.status(200).send({code: 'R001', message: 'Form already filled'})
  } else {
    let path = './db/user.json'
    userConfig.push({
      name,
      email,
      mobile,
      address,
      uniqueCode
    })
    let fileData = JSON.stringify(userConfig)
    fs.writeFile(path, fileData, (err) => {
      if (err) {
        // console.log(err)
      } else {
        return res.status(200).send({code: 'R002', message: 'Registered Successfully'})
      }
    })
  }
}
