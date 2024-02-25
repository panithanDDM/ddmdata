const { pool } = require('../utilities/poolConfig')


//GET ALL DATA 
// const InvenData = async (limit, offset) => {
//     try {
//         const query = `SELECT * FROM inventory ORDER BY date DESC LIMIT $1 OFFSET $2`;
//         const result = await pool.query(query, [limit, offset]);
//         return result.rows;
//     } catch (error) {
//         console.log('ERROR INVEN-MODEL :: ', error);
//         res.render('error')
//     }
// }
// module.exports.InvenData = InvenData
const InvenData = async () => {
    try {
        const query = `SELECT * FROM inventory`
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