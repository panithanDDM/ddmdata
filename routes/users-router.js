var express = require('express');
var router = express.Router();


const loginController = require('../controllers/user-controller/login-controller')
const registerController = require('../controllers/user-controller/register-controller')

//Mioddle ware reuirre
const redirectIfAuth = require('../middleware/redirectIfAuth')
const AuthChecker = require('../middleware/authChecker')


router.get('/', redirectIfAuth, loginController.loginPage)
router.post('/', loginController.loginSystem)

//Register 
router.get('/register/', redirectIfAuth, registerController.registerPage)
router.post('/register/', registerController.createUser)


//LOGOUT
router.get('/logout/', loginController.logout)

module.exports = router;



