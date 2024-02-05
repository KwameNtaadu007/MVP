const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // You may store the image URL or use a dedicated storage service
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    enum: ["user", "editor", "admin"],
    default: "user",
  },
});

// Fire a function before doc is saved to the database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Fire a function after doc is saved to the database
userSchema.post("save", function (doc, next) {
  console.log("New user saved: ", doc);
  next();
});

//static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("password does not exit");
  }
  throw Error("incorrect email");
};

//static signup method
userSchema.statics.signup = async function (signupData) {
  const { username, email, password, name, profilePicture, bio, role } =
    signupData;
  try {
    //validation
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const exists = await this.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      username,
      email,
      password: hashedPassword,
      name,
      profilePicture,
      bio,
      role,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
