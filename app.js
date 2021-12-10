const express = require("express")
const app = express();
const mongoose = require('mongoose');
const File = require('./models/file')
const path = require('path')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
console.log("actual")

app.set("view engine", "ejs");

mongoose.connect('mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/codefreez?retryWrites=true&w=majority').then(() => {
    console.log('connected to mongo');
}).catch((err) => console.log('error while connecting mongo', err))

app.get("/upload", (req, res) => {
    res.render("home3");
})

app.post("/upload", (req, res) => {
    console.log(req)

    res.send('Success');
})
app.post("/uploadtodb", async (req, res) => {
    console.log(req.body)
    const newdata = await File.create({ url: req.body.url, passcode: req.body.passcode })
    if (newdata) { res.json('success') }
    else res.json('failed')
})
app.post('/getfromdb', async (req, res) => {
    const newdata = await File.find({ passcode: req.body.passcode.toString() })
    console.log(req.body, newdata)
    if (newdata[0].url) {
        console.log(newdata[0].url)
        return res.json({ url: newdata[0].url })
    } else {
        res.send('Invalid Passcode')
    }
})

app.listen(3000);