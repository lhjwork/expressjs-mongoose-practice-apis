// Contat Routes
// CRUD routes ->
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact
      .save()
      .then((savedContact) => {
        console.log("Contact saved successfully:", savedContact);
        res.status(201).json({ msg: "Contact saved successfully" });
      })
      .catch((error) => {
        console.error("Error saving contact:", error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.emailAddress) {
          return res.status(500).json({ msg: "Email address already exists" });
        } else {
          res.status(500).json({ msg: "Failed to save contact" });
        }
      });
  } catch (error) {
    res.status(500).json({ msg: "Unable to save contact" });
  }
});

module.exports = router;
// POST /api/contact : 새로운 연락처를 생성합니다. 요청 본문에 연락처 정보를 포함해야 합니다.
