const mongoose = require('mongoose');

const password = process.env.MONGOPASSWORD
const username = process.env.MONGOUSERNAME

const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.rvfzfpf.mongodb.net/test`

const db = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`connection successfull`)
}).catch(() => {
    console.log(`connection error`)
})

module.exports = db;