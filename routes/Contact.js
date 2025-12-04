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

// READ Functionality - Read All Contacts
router.get("/contact", async (req, res) => {
  try {
    // .then() 대신 await를 사용하여 비동기 처리가 끝날 때까지 기다립니다.
    // 결과값(contacts)을 변수에 바로 할당받아 직관적입니다.
    const contacts = await Contact.find();

    // 이미지에서는 { contacts: contacts } 객체로 감쌌지만,
    // 보통은 배열을 바로 반환하는 것이 REST API 표준에 더 가깝습니다.
    res.status(200).json(contacts);
  } catch (error) {
    // 에러 발생 시 catch 블록으로 점프하여 처리합니다.
    console.error(error); // 디버깅을 위해 로그 추가 권장
    res.status(500).json({ msg: "Failed to retrieve contacts" });
  }
});

// Read Functionality - Read Single Contact
router.get("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ msg: "Contact not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to retrieve contact" });
  }
});

// Search Functionality - Search Contacts
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const searchRegex = new RegExp(searchTerm, "i");

    const matchingContacts = await Contact.find({
      $or: [{ firstName: searchRegex }, { lastName: searchRegex }, { emailAddress: searchRegex }],
    });

    console.log(matchingContacts);
    if (matchingContacts.length) {
      res.status(200).json({ contacts: matchingContacts });
    } else {
      res.status(200).json({ contacts: [], msg: "No matching contacts found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to find contacts" });
  }
});

// Update Functionality - PUT /contact/:id (async/await 버전)
router.put("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedContact = req.body;

    const contact = await Contact.findOneAndUpdate({ _id: id }, updatedContact, { new: true });

    if (contact) {
      console.log(contact);
      res.status(200).json({ msg: "Contact successfully updated", contact: contact });
    } else {
      res.status(404).json({ msg: "Contact not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to update the contact" });
  }
});

// 2 types of delete
// 1. Soft Delete - update the field "active" to mark as deleted ->  Y/N
// 2. Hard Delete - remove from DB

router.delete("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (deletedContact) {
      console.log(deletedContact);
      return res.status(200).json({ msg: "Contact Successfully deleted", contact: deletedContact });
    } else {
      return res.status(404).json({ msg: "Contact not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unable to delete the contact" });
  }
});

module.exports = router;
// POST /api/contact : 새로운 연락처를 생성합니다. 요청 본문에 연락처 정보를 포함해야 합니다.
