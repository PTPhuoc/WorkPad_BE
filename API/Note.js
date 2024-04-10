const NoteModel = require("../Model/NoteModel");
const uri = require("express").Router();

uri.post("/SaveNote", async (req, res) => {
  try {
    const DateTime = new Date();
    const day = DateTime.getDate();
    const month = DateTime.getMonth() + 1;
    const year = DateTime.getFullYear();
    const newNote = new NoteModel({
      Title: req.body.Title,
      Content: req.body.Content,
      EmailCreate: req.body.Email,
      DateCreate: day + "/" + month + "/" + year,
    });
    const saveNote = await newNote.save();
    if (saveNote) {
      res.json({ Status: "Success" });
    } else {
      res.json({ Status: "Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/GetNoteByEmail", async (req, res) => {
  const Notes = await NoteModel.find({ EmailCreate: req.body.Email });
  if (!Notes || Notes.length === 0) {
    res.send({ Status: "Not Found" });
  } else {
    res.send(Notes);
  }
});

uri.post("/ChangeTitle", async (req, res) => {
  try {
    await NoteModel.findByIdAndUpdate(req.body._id, {
      $set: { Title: req.body.Title },
    });
    res.send({ Status: "Success" });
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ChangeContent", async (req, res) => {
  try {
    await NoteModel.findByIdAndUpdate(req.body._id, {
      $set: { Content: req.body.Content },
    });
    res.send({ Status: "Success" });
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ChangePrioritize", async (req, res) => {
  try {
    await NoteModel.findByIdAndUpdate(req.body._id, {
      $set: { Prioritize: req.body.Prioritize },
    });
    res.send({ Status: "Success" });
  } catch (err) {
    console.log(err);
  }
});

uri.post("/DeleteNote", async (req, res) => {
  try {
    await NoteModel.findByIdAndDelete(req.body._id);
    res.send({ Status: "Success" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = uri;
