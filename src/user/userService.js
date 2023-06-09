var userModel = require('./userModel');
var key = 'testtest123456789';
const encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        var userModelData = new userModel();

        userModelData.firstname = userDetails.firstname;
        userModelData.lastname = userDetails.lastname;
        userModelData.email = userDetails.email;
        userModelData.password = userDetails.password;
        var encryptedPassword = encryptor.encrypt(userDetails.password);
        userModelData.password = encryptedPassword;

        userModelData.save()
            .then(result => {
                resolve(true);
            })
            .catch(error => {
                reject(false);
            });
    });
};
module.exports.checkEmailExistence = async (email) => {
    try {
      const user = await userModel.findOne({ email });
      return user !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
module.exports.loginUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userDetails.email }).exec()
            .then(result => {
                if (result != undefined && result != null) {
                    var decrypted = encryptor.decrypt(result.password);

                    if (decrypted == userDetails.password) {
                        resolve({ status: true, msg: "User Validated Successfully" });
                    } else {
                        reject({ status: false, msg: "User Validation Failed" });
                    }
                } else {
                    reject({ status: false, msg: "User Error Details" });
                }
            })
            .catch(error => {
                reject({ status: false, msg: "Invalid Data" });
            });
    });
}

