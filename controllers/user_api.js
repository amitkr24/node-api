const User = require("../models/user");
let session = require("express-session");

// for listing all users
module.exports.index = async function (req, res) {
  try {
    let user = await User.find({}).sort("createdAt");
    res.json(user);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.list = async function (req, res) {
  try {
    return res.render("../view/user/index");
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// for create user form
module.exports.register = function (req, res) {
  res.render("../view/user/add-user");
};

//for creating new user
module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    if (!user) {
      let data = await req.body;

      if (req.file) {
        data.avatar = req.file.filename;
      }
      let userAdded = await User.create(data);
      req.flash("success", "User Created Successfully !");
      res.json(userAdded);
    } else {
      let email = user.email;
      let phone = user.phone;
      if (email == req.body.email) {
        req.flash("error", "Email Already Exist");
        return res.json({
          message: "Email Already Exist",
        });
      }
      if (phone == req.body.phone) {
        req.flash("error", "Phone number Already Exist");
        return res.json({
          message: "Phone number Already Exist",
        });
      }
    }
  } catch {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

// for update user form
module.exports.show = async function (req, res) {
  try {
    var id = await new require("mongodb").ObjectID(req.params.id);
    let user = await User.findOne({ _id: id });
    console.log(user);
    if (user) {
      return res.render("../view/user/edit-user", { user: user, id: id });
    }
  } catch {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

//update existing user
module.exports.updateUser = async function (req, res) {
  try {
    console.log(req.params.id);
    let id = await req.params.id;
    let data = await req.body;
    if (req.file) {
      data.avatar = req.file.filename;
    }
    let updated = await User.findByIdAndUpdate(id, data);
    //return res.redirect('/list');
    req.flash("success", "User Updated Successfully !");
    return res.json(data);
  } catch {
    res.json("Internal Server Error");
  }
};

//remove user
module.exports.destroy = async function (req, res) {
  try {
    let uid = await req.params.id;
    let destroy = await User.findByIdAndDelete(uid);
    //return res.redirect('/list');
    return res.json(destroy);
  } catch {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
