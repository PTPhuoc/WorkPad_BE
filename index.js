const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Account = require("./API/Account.js")
const Note = require("./API/Note.js")

mongoose.connect("mongodb+srv://TanPhuoc:11112222@pusen.7tdtd7c.mongodb.net/WorkPad?retryWrites=true&w=majority&appName=PUsen");

app.use(express.json());
app.use(cors())

const db = mongoose.connection;
db.once('open', () => {
    console.log('Kết nối MongoDB thành công');
});

app.use("/Account", Account)
app.use("/Note", Note)

app.listen(9000, () => {
  console.log("Server is running!");
});