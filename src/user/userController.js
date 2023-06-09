var userService = require('./userService');

var createUserControllerFn = async (req, res) => {
    try {
        var emailExists = await userService.checkEmailExistence(req.body.email);

        if (emailExists) {
            res.send({ "status": false, "message": "Email already exists. Please use another email" });
        } else {
            var status = await userService.createUserDBService(req.body);

            if (status) {
                res.send({ "status": true, "message": "User created successfully" });
            } else {
                res.send({ "status": false, "message": "Error creating user" });
            }
        }
    } catch (error) {
        console.error(error);
        res.send({ "status": false, "message": "An error occurred while creating the user" });
    }
};

var loginUserControllerFn = async (req, res) => {
    //var result = null; 
    try {
        var result = await userService.loginUserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.error(error);
        res.send({ "status": false, "message": "An error occurred while logging in" });
    }
};

const checkEmailControllerFn = async (req, res) => {
    try {
      const email = req.body.email;
      const emailExists = await userService.checkEmailExistence(email);
  
      if (emailExists) {
        res.send({ status: false, message: "Email already exists. Please use another email." });
      } else {
        res.send({ status: true, message: "Chk Email is available." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "An error occurred while checking the email." });
    }
  };
  
  

module.exports = { createUserControllerFn, loginUserControllerFn,checkEmailControllerFn};
