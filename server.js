const express = require('express')
const app = express()
const formidable = require('formidable')
const fs = require('fs')

app.post('/upload', (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'})
  const form = new formidable.IncomingForm()
  form.uploadDir = './tmp/'
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    console.log(files)
    if (!err) {
      res.send({result: 1, message: 'upload success'})
    }
  })
})

app.post('/uploadImage', (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'})
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    body = JSON.parse(body)
    const {image} = body
    const name = image.name
    const base64 = image.dataSrc.replace(/^data:image\/\w+;base64,/, '')
    const buffer = new Buffer(base64, 'base64')
    fs.writeFile(`./tmp/${name}`, buffer, err => {
      if (!err) {
        res.send({result: 1, message: 'upload success'})
      }
    })
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})