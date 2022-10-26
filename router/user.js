const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//controller for listing
//const userController  = require('../controllers/user_controller'); // project controller added
const userController = require("../controllers/user_api"); // for api check in postman
const User = require("../models/user");

// storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

router.get("/", userController.index); // route for listing user
router.get("/list", userController.list); // route for listing user
router.get("/:id/edit", userController.show); // route for show update user form
router.get("/register", userController.register); // route for create new user form
router.post("/create", upload.single("avatar"), userController.create); // route for creating new user
router.put("/:id/update", upload.single("avatar"), userController.updateUser); // route for updating new user
router.delete("/destroy/:id", userController.destroy); // route for delete user

module.exports = router;
