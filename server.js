const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

app.get('/transcripts', async (req, res) => {
    try {
        const url = req.query.url
        if (!url) return res.status(400).json({ error: 'Missing "url" parameter' })
        
        const response = await axios.get(url)
        const htmlContent = response.data

        res.send(htmlContent)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
