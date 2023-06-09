var express = require('express');
var userController = require('../src/user/userController');

const router = express.Router();
 
router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/user/check-email').post(userController.checkEmailControllerFn);
 
module.exports = router;