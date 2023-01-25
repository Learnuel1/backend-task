const UserModel = require("../models/user.model")

exports.register = async (userInfor) => {
  try {
    const user = await UserModel.create({
      ...userInfor
    });
    return user;
  } catch (error) {
    return { error }
  }
}
exports.update = async (userId, userInfor) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, {
      ...userInfor
    }, { returnOriginal: false });
    if (!user)
      return { error: "User not found" };
    return user;
  } catch (error) {
    return { error }
  }
}

exports.checkEmail = async (email) => {
  try {
    const check = await UserModel.findOne({ email });
    if (!check)
      return false;
    return true;
  } catch (error) {
    return { error };
  }
}
exports.checkUsername = async (username) => {
  try {
    const check = await UserModel.findOne({ username });
    if (!check)
      return false;
    return true;
  } catch (error) {
    return { error };
  }
}
exports.remove = async (userId) => {
  try {
    const user = await UserModel.findByIdAndDelete({ _id: userId });
    if (!user)
      return { error: "No user found" };
    return user;
  } catch (error) {
    return { error };
  }
}

exports.users = async () => {
  try {
    const users = await UserModel.find({});
    if (users.length === 0 || !users)
      return { error: "No user exist" };
    return users;
  } catch (error) {
    return { error };
  }
}