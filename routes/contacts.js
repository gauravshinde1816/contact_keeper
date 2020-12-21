const express = require("express");
const router = express.Router();

//@GET route to get all contacts

//End point api/contacts
router.get("/", (req, res) => {
  res.send("get all contacts");
});

//@POST route to add contacts

//End point api/contacts
router.post("/", (req, res) => {
  res.send(" Add contact here");
});

//@PUT route to update contacts

//End point api/contacts/:id
router.put("/:id", (req, res) => {
  res.send(" update contact here");
});

//@DELETE route to delete contacts

//End point api/contacts/:id
router.delete("/:id", (req, res) => {
  res.send(" delete contact here");
});

module.exports = router;
