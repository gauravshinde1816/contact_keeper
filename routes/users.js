const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
//@POST route for registering the user

//End point api/users
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),

    check("email", "Please enter the valid email id").isEmail(),
    check(
      "password",
      "Please enter the password with character with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      var user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: errors.array() });
      } else {
        user = new User({
          name,
          password,
          email,
        });
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
