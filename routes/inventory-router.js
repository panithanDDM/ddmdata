var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const inventoryController = require('../controllers/inventory/inventory-controller')
//Mioddle ware reuirre
const redirectIfAuth = require('../middleware/redirectIfAuth')
const AuthChecker = require('../middleware/authChecker')

// ตั้งค่า Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/inventory_upload')//ตำแหน่งจัดเก็บ
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
});




router.get('/form/', AuthChecker, inventoryController.invenForm)
router.post('/form/', AuthChecker, upload.single('image'), inventoryController.formInventory)

//get By ID 
router.get('/:id/', AuthChecker, inventoryController.detailInventory)

//อัพเดตฟอร์มตาม ID
router.post('/:id/', AuthChecker, inventoryController.formUpdateInventory)
// router.post('/:id/update', inventoryController.updateInventory);

// Delete inventory item by ID
router.post('/:id/delete', AuthChecker, inventoryController.deleteInventory);

module.exports = router;



