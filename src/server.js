const express = require('express')
require('dotenv').config()
const AWS = require('aws-sdk')
require('aws-sdk/lib/maintenance_mode_message').suppress = true
const s3 = new AWS.S3()

const app = express()
app.use(express.json())
app.use(express.static('public'))
const port = process.env.PORT || 8080

// Transcripts
app.post('/transcripts', (req, res) => {
  const { html, APIKey, Date } = req.body

  if (APIKey !== process.env.APIKey) {
    res.status(401).send('Unauthorized')
    return;
  }

  const options = {
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: `public/transcripts/${Date}.html`,
    Body: html,
  }

  s3.putObject(options, (err) => {
    
    if (err) {
      console.error(err)
      res.status(500).send('Error writing HTML data')
    } else {
      console.log('HTML data written to file')
      res.send('HTML data received and written to file')
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})