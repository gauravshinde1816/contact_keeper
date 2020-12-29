const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");

//@GET request to get logged in

//End point  api/auth
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST request to authenticate the user

//End point  api/auth
router.post(
  "/",
  [
    check("email", "Please enter the email").isEmail(),
    check("password", "Please enter he correct password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      var user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "Please enter the correct email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.send(400).json({ msg: "Please enter the correct password" });
      }

      //sending Json web token

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("JwtSecret"),
        { expiresIn: 72000 },
        (err, token) => {
          if (err) {
            console.log(err.message);
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
