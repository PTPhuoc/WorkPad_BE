const uri = require("express").Router();
const bcrypt = require("bcrypt");
const Account = require("../Model/AccountModel.js");

const HashPassword = async (Password) => {
  const Hash = await bcrypt.hash(Password, 10);
  return Hash;
};

const ComparePassword = async (Password, PasswordHash) => {
  const isMath = await bcrypt.compare(Password, PasswordHash);
  return isMath;
};

uri.post("/SignUp", async (req, res) => {
  const NewAccount = new Account({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: await HashPassword(req.body.Password),
  });
  res.send(NewAccount);
  await NewAccount.save();
});

uri.post("/SignIn", async (req, res) => {
  const User = await Account.findOne({ Email: req.body.Email });
  if (!User) {
    res.json({ Status: "Wrong Email" });
  } else {
    const isPasswordValid = await ComparePassword(
      req.body.Password,
      User.Password
    );
    if (isPasswordValid) {
      res.json(User);
    } else {
      res.json({ Status: "Wrong Password" });
    }
  }
});

uri.post("/GetAccount", async (req, res) => {
  if (req.body.Email !== "") {
    const User = await Account.findOne({ Email: req.body.Email });
    if (User.Password === req.body.Password) {
      res.json(User);
    } else {
      res.json({ Status: "Fauld" });
    }
  } else {
    res.json({ Status: "Fauld" });
  }
});

uri.post("/CheckEmail", async (req, res) => {
  const User = await Account.findOne({ Email: req.body.Email });
  if (User) {
    res.json({ Status: "Fauld" });
  } else {
    res.json({ Status: "Success" });
  }
});

module.exports = uri;
