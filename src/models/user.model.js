const { Schema, model } = require("mongoose");

 
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true,"Firstname is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  username: {
    type: String,
    require: [true, "Username is required"],
    index: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    indexed: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    indexed: true,
  },
},
{ timestamp: true }
);

const UserModel = model("user", UserSchema);
module.exports = UserModel;