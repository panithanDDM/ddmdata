var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');



//Controller import
const surveyController = require('../controllers/survey-controller/survey-controller')



router.get('/', surveyController.surveyHome)
router.post('/', surveyController.formProject)

router.get('/:id/', surveyController.projectById)


module.exports = router;