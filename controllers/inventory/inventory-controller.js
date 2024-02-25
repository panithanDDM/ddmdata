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

