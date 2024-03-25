const { pool } = require('../utilities/poolConfig')

// ดึงข้อมูลทั้งหมดจาก database
const InvenData = async () => {
    try {
        const query = `SELECT * FROM inventory ORDER BY date DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.error(`Error from model InvenData :: ${error}`)
    }
}
module.exports.InvenData = InvenData



const totalItem = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory`
        const result = await pool.query(query)
        // const totalCount = result.rows[0].total;
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.totalItem = totalItem

const activeItem = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory WHERE status = 'Active'`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.activeItem = activeItem

const damageItem = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory WHERE status = 'Damaged'`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.damageItem = damageItem

const pendingItem = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM inventory WHERE status = 'Pending'`
        const result = await pool.query(query)
        return result.rows[0].total;
    }
    catch (error) {
        console.log(`Error from totalItem :: ${error}`)
    }
}
module.exports.pendingItem = pendingItem



//สำหรับข้อมูลที่กรอกในฟอร์มทะเบียนทรัพย์สิน
const inventorySaveData = async (
    name,
    model,
    serail_number,
    type,
    status,
    image,
    date) => {

    try {
        const query = `INSERT INTO inventory (name, model, serail_number, type, status, image, date)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`
        const values = [name, model, serail_number, type, status, image, date]
        await pool.query(query, values)
        console.log(`Inventory form insert success`)
    }
    catch (error) {
        console.error('Error for inventory form model', error)
        throw new Error(error)
    }
}
module.exports.inventorySaveData = inventorySaveData




//สำหรับเลือกตาม ID 
const getInventoryById = async (id) => {
    try {
        const query = `SELECT * FROM inventory WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }
    catch (error) {
        console.log(`Error from getInventoryById :: ${error}`)
        throw error
    }
}
module.exports.getInventoryById = getInventoryById

//สำหรับการอัพเดตตาม ID
const updateInventory = async (id, newData) => {
    try {
        const { name, model, serail_number, type, status, date } = newData;
        const query = `UPDATE inventory SET name = $1, model = $2, serail_number = $3, type = $4, status = $5, date = $6 WHERE id = $7`;
        const values = [name, model, serail_number, type, status, date, id];
        await pool.query(query, values)
        console.log(`Update success`)
    }
    catch (error) {
        console.error(`Error from updateinventoryById :: ${error}`)
        throw error
    }
}
module.exports.updateInventory = updateInventory


// ลบข้อมูลตาม ID ทีได้มา
const deleteInventoryById = async (id) => {
    try {
        const query = `DELETE FROM inventory WHERE id = $1`
        await pool.query(query, [id])
    }
    catch (error) {
        console.log(`Error From deleteInventoryById :: ${error} `)
        throw error;
    }
}
module.exports.deleteInventoryById = deleteInventoryById