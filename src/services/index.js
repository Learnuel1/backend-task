const UserModule = require("./user.service");
exports.registerUser = async (userInfor) => UserModule.register(userInfor);
exports.updateUser = async (userId, userInfor) => UserModule.update(userId, userInfor);
exports.newEmailExists = async (email) => UserModule.checkEmail(email)
exports.newUsernameExists = async (username) => UserModule.checkUsername(username)
exports.getUser = async () => UserModule.users();
exports.removeUser = async (userId) => UserModule.remove(userId);