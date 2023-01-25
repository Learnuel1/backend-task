const { newEmailExists, newUsernameExists, registerUser, getUser, removeUser, updateUser } = require("../services");
const { APIError } = require("../utils/apiError");
const { isValidEmail } = require("../utils/validation");
const { hashSync } = require("bcryptjs")
const responseBuilder = require("../utils/responsBuilder");
exports.registration = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName)
      return next(APIError.badRequest("Firstname is required"));
    if (!lastName)
      return next(APIError.badRequest("Lastname is required"));
    if (!username)
      return next(APIError.badRequest("Username is required"));
    if (!email)
      return next(APIError.badRequest("Email is required"));
    if (!password)
      return next(APIError.badRequest("Password is required"));
    if (!isValidEmail(email))
      return next(APIError.badRequest("Email is invalid"));
    let check = await newEmailExists(email)
    if (check)
      return next(APIError.customError(`${email} is not available`, 400))
    check = await newUsernameExists(username);
    if (check)
      return next(APIError.customError(`${username} is not available`, 400))
    const hashedPass = hashSync(password, 12);
    const info = { firstName, lastName, username, email, hashedPass }
    const user = await registerUser(info);
    if (!user)
      return next(APIError.customError("Registration failled"));
    if (user.error)
      return next(APIError.customError(user.error, 400));
    const data = responseBuilder.buildUser(user.toObject());
    const response = responseBuilder.commonReponse("Registration successful", data, "user");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
exports.userUpdate = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let check;
    if (!userId)
      return next(APIError.badRequest("UserId is required"));
    const userInfor = {}
    for (key in req.body) {
      if (key !== "userId")
        userInfor[key] = req.body[key];
    };
    if (userInfor.email) {
      if (!isValidEmail(userInfor.email))
        return next(APIError.badRequest("Email is invalid"));
      check = await newEmailExists(userInfor.email)
      if (check)
        return next(APIError.customError(`${userInfor.email} is not available`, 400))
    }
    if (userInfor.username) {
      check = await newUsernameExists(userInfor.username);
      if (check)
        return next(APIError.customError(`${userInfor.username} is not available`, 400))
    }
    if (userInfor.password) {
      const hashedPass = hashSync(userInfor.password, 12);
      userInfor.password = hashedPass;
    }
    const user = await updateUser(userId, userInfor);
    if (!user)
      return next(APIError.customError("User update failled"));
    if (user.error)
      return next(APIError.customError(user.error, 400));
    const data = responseBuilder.buildUser(user.toObject());
    const response = responseBuilder.commonReponse("Update successful", data, "user");
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getUser();
    if (users.error)
      return next(APIError.customError(users.error, 404));
    const data = users.map((cur) => {
      return responseBuilder.buildUser(cur.toObject());
    });
    const response = responseBuilder.commonReponse("Found", data, "user");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId)
      return next(APIError.badRequest("userId is required"));
    const users = await removeUser(userId.trim());
    if (users.error)
      return next(APIError.customError(users.error, 404));
    res.status(200).json({ sucess: true, msg: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}