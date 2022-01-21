const mongoose = require("mongoose");
const express = require('express')
const app = express()
const port = 3000

mongoose.connect('mongodb+srv://username12345:Password@cluster0.zqpsm.mongodb.net/database?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("db success")
})


app.get('/', (req, res) => {
    res.send('I have no idea what I am doing!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
