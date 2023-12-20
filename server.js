const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const db = process.env.DB

const port = 3000
const app = express()
app.use(express.static('public'));

(async () => {
    try { 
        await mongoose.connect(db, {connectTimeoutMS: 5000})
        console.log('Connected to MongoDB!')
    } catch (err) {
        console.log(err)
    }
})()

app.get('/transcripts', async (req, res) => {
    try {
        const id = req.query.id
        if (!id) return res.status(400).json({error: 'Missing ID'})

        const transcriptSchema = require('./transcriptSchema')
        const data = await transcriptSchema.findOne({ID: id})
        if (!data) return res.status(404).json({error: 'Transcript not found'})

        res.send(data.File)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
