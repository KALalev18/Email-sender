const express = require('express')
const app_route = require('./routes/route.js')

const app = express()
const PORT  = process.env.PORT || 5000

app.use(express.json())

// routes - bit of back-end

app.use('/api', app_route)

app.listen(PORT, () => {
    console.log('Server is running on port https://localhost:5000')
})