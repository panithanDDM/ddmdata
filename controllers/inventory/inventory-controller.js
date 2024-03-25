const { query } = require('express')

const inventoryModel = require('../../models/inventory-model')


// Render หน้า Form
const invenForm = async (req, res) => {
    res.render('inventory/form', {
        flash: req.flash(),
        title: `Inventory form`,
    })
}
module.exports.invenForm = invenForm


// ฟอร์มสำหรับการบันทึกข้อมูลไปในฟอร์มอุปกรณ์
const formInventory = async (req, res) => {
    const { name, model, serail_number, type, status, date } = req.body
    const image = req.file.filename
    try {
        await inventoryModel.inventorySaveData(name, model, serail_number, type, status, image, date)
        console.log(`insert form for equiment name ${name}`)
        res.redirect('/home/')
    }
    catch (error) {
        console.error('Error from form inven controller', error)
    }
}
module.exports.formInventory = formInventory




// สำหรับการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
const calculateDays = (startDate, endDate) => {
    const diffInMs = Math.abs(endDate - startDate);
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
};


//การดึงข้อมูลจาก database มาแสดง โดยเลือกจาก ID
const detailInventory = async (req, res) => {
    try {
        const id = req.params.id // รับค่าจาก URL
        const detailInventory = await inventoryModel.getInventoryById(id)

        //ตรวจสอบว่ามี data เข้ามาหรือเปล่า
        if (!detailInventory) {
            return res.status(404).send('Inventory item not found')
        }

        // ฟังชั่นการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
        const currentDate = new Date();
        const itemDate = new Date(detailInventory.date);
        const daysPassed = calculateDays(itemDate, currentDate);

        res.render('inventory/detail', {
            title: 'Detail Data',
            detailInventory: detailInventory,
            daysPassed: daysPassed,
            dateForm: itemDate.toLocaleDateString()
        })
    }
    catch (error) {
        console.error(`Error from controller getInventoryDetails: ${error}`);
        res.status(500).send('Internal Server Error');
    }
}
module.exports.detailInventory = detailInventory



//ฟอร์มสำหรับการอัพเดต Inventory
const formUpdateInventory = async (req, res) => {
    try {
        const id = req.params.id
        const { name, model, serail_number, type, status, date } = req.body
        const newData = { name, model, serail_number, type, status, date }

        // console.log(id, newData)
        await inventoryModel.updateInventory(id, newData)

        res.redirect(`/inventory/${id}`)
    }
    catch (error) {
        console.error(`Error Form formUpdateInventory :: ${error} `)
    }
}
module.exports.formUpdateInventory = formUpdateInventory



// ลบข้อมูล
const deleteInventory = async (req, res) => {
    try {
        const id = req.params.id
        await inventoryModel.deleteInventoryById(id)
        res.redirect('/')
    }
    catch (error) {
        console.log(`Error From deleteInventory :: ${error}`)
        throw error
    }
}
module.exports.deleteInventory = deleteInventory

