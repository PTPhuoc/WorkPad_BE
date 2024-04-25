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
  try {
    const NewAccount = new Account({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: await HashPassword(req.body.Password),
      Type: req.body.Type,
    });
    await NewAccount.save();
    res.send(NewAccount);
  } catch (err) {
    console.log(err);
  }
});

uri.post("/SignIn", async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ChangeName", async (req, res) => {
  try {
    await Account.findByIdAndUpdate(req.body._id, {
      $set: { Name: req.body.Ten },
    });
    res.send({ Status: "Success" });
  } catch (err) {
    console.log(err);
  }
});

uri.post("/GetAccount", async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
});

uri.post("/CheckEmail", async (req, res) => {
  try {
    const User = await Account.findOne({ Email: req.body.Email });
    if (User) {
      res.json({ Status: "Fauld" });
    } else {
      res.json({ Status: "Success" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ChangePassword", async (req, res) => {
  try {
    await Account.findOneAndUpdate(
      { Email: req.body.Email },
      { $set: { Password: await HashPassword(req.body.Password) } }
    );
    res.send({ Status: "Success" });
  } catch (err) {
    console.log(err);
  }
});

uri.post("/SendCode", async (req, res) => {
  const generateOTP = Math.floor(100000 + Math.random() * 900000);
  const Email = req.body.Email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "1050080070@sv.hcmunre.edu.vn",
      pass: "cgzj dcgv wvry qjwf",
    },
  });
  const msg =
    "<p> Mã của bạn để lấy lại mật khẩu cho Email: <b>" +
    Email +
    "</b>, </br> <h4>" +
    generateOTP +
    "</h4></p>";
  const mailOptions = {
    from: "1050080070@sv.hcmunre.edu.vn",
    to: Email,
    subject: "Lấy lại mật khẩu",
    html: msg,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send({ Code: generateOTP });
      console.log(info);
    }
  });
});

uri.post("/GetTrueAccount", async (req, res) => {
  try {
    const Account = await Account.findOne({ Email: req.body.Email });
    res.send(Account);
  } catch (err) {
    console.log(err);
  }
});

module.exports = uri;
