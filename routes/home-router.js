var express = require('express');
var router = express.Router();



const Homecontroller = require('../controllers/home-controller')
//Mioddle ware reuirre
const redirectIfAuth = require('../middleware/redirectIfAuth')
const AuthChecker = require('../middleware/authChecker')



//After LOGIN
router.get('/', AuthChecker, Homecontroller.homePage)



module.exports = router;