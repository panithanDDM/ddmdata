const { query } = require('express')

const inventoryModel = require('../../models/inventory-model')

const invenForm = async (req, res) => {
    res.render('inventory/form', {
        flash: req.flash(),
        title: `Inventory form`,
    })
}
module.exports.invenForm = invenForm



const formInventory = async (req, res) => {
    const { name, model, serail_number, type, status, date } = req.body
    const image = req.file.filename
    console.log(name, model, serail_number, type, status, date)
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





const calculateDays = (startDate, endDate) => {
    const diffInMs = Math.abs(endDate - startDate);
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
};

//เลือกออกมา 1 จาม Id
const detailInventory = async (req, res) => {
    try {
        const id = req.params.id // รับค่าจาก URL
        const detailInventory = await inventoryModel.getInventoryById(id)

        //check data
        if (!detailInventory) {
            return res.status(404).send('Inventory item not found')
        }

        const currentDate = new Date();
        const itemDate = new Date(detailInventory.date);
        const daysPassed = calculateDays(itemDate, currentDate);

        res.render('inventory/detail', {
            title: 'Detail Data',
            detailInventory: detailInventory,
            daysPassed: daysPassed
        })
    }
    catch (error) {
        console.error(`Error from controller getInventoryDetails: ${error}`);
        res.status(500).send('Internal Server Error');
    }
}
module.exports.detailInventory = detailInventory

