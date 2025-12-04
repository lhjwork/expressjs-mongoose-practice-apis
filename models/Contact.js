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

//module.exports = mongoose.model("Contact", contactSchema); : contactSchema로 Contact 모델(클래스)을 생성해 현재 모듈의 기본 내보내기값으로 설정합니다.
module.exports = mongoose.model("Contact", contactSchema);
