const express = require('express')
const app = express()

app.get('*', express.static('public'))

app.listen(8545, () => console.log('Listening on port 8545'))