const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(require('./routes'))


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})