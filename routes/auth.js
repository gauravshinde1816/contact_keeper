const express = require("express");
const router = express.Router();

//@GET request to get logged in

//End point  api/auth
router.get("/", (req, res) => {
  res.send("login here");
});

//@POST request to authenticate the user

//End point  api/auth
router.post("/", (req, res) => {
  res.send("authenticate here");
});
module.exports = router;
