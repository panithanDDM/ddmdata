//connect data base 
const { pool } = require('../utilities/poolConfig')


const invenModel = require('../models/inventory-model')

//render home page after LOGIN
// const homePage = async (req, res) => {
//     const ITEMS_PER_PAGE = 50;
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const offset = (page - 1) * ITEMS_PER_PAGE;

//         const data = await invenModel.InvenData(ITEMS_PER_PAGE, offset);
//         const totalItems = await invenModel.getTotalItems();
//         const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//         const startPage = Math.max(1, page - 1);
//         const endPage = Math.min(totalPages, page + 1);


//         res.render('home', {
//             title: `Home Page`,
//             data: data,
//             currentPage: page,
//             totalPages: totalPages,
//             startPage: startPage,
//             endPage: endPage
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }
// module.exports.homePage = homePage;


const calculateDays = (startDate, endDate) => {
    const diffInMs = Math.abs(endDate - startDate);
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
};


const homePage = async (req, res) => {
    try {

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



