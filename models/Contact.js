const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    default: "",
    validate: {
      validator: function (v) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(v);
      },
      message: "First name must contain only alphabetic characters",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  emailAddress: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
});
