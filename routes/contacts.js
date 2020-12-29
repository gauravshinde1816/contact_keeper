const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contacts = require("../models/Contacts");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
//@GET route to get all contacts

//End point api/contacts
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

//@POST route to add contacts

//End point api/contacts
router.post(
  "/",
  [auth, [check("name", "Enter the name").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNo, type } = req.body;

    try {
      const newContact = new Contacts({
        name,
        email,
        phoneNo,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

//@PUT route to update contacts

//End point api/contacts/:id
router.put("/:id", auth, async (req, res) => {
  //get all the details of user
  const { name, email, phoneNo, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phoneNo) contactFields.phoneNo = phoneNo;
  if (type) contactFields.type = type;

  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }

  res.send(" update contact here");
});

//@DELETE route to delete contacts

//End point api/contacts/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contacts.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
