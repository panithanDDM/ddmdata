//connect data base 
const { pool } = require('../utilities/poolConfig')


const invenModel = require('../models/inventory-model')

// สำหรับการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
const calculateDays = (startDate, endDate) => {
    const diffInMs = Math.abs(endDate - startDate);
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
};


const homePage = async (req, res) => {

    try { // ฟังชั่นการคำนวนวันที่ว่าผ่านมากี่วันแล้ว
        const data = await invenModel.InvenData()
        const currentDate = new Date();
        for (const item of data) {
            const itemDate = new Date(item.date);
            item.daysPassed = calculateDays(itemDate, currentDate);
        }

        const totalCount = await invenModel.totalItem()
        const activeCount = await invenModel.activeItem()
        const damageCount = await invenModel.damageItem()
        const pendingCount = await invenModel.pendingItem()

        res.render('home', {
            title: `Home page`,
            data: data,
            totalCount: totalCount,
            activeCount: activeCount,
            damageCount, damageCount,
            pendingCount: pendingCount
        })
    }
    catch (error) {
        console.error(`Error From controller homePage ::${error}`);
    }
}
module.exports.homePage = homePage;



