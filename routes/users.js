const express = require("express");
const router = express.Router();

//@POST route for registering the user

//End point api/users
router.post("/", (req, res) => {
  res.send("Register here");
});

module.exports = router;
