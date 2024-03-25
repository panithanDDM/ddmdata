
// Require Survey model
const surveyModel = require('../../models/survey-model.js')
const inventoryModel = require('../../models/inventory-model.js')


// แสดงผลหน้า Home survey และ สำหรับการนำข้อมูลจาก Data base มาแสดงที่ตาราง Project Name
const surveyHome = async (req, res) => {
    try {
        const data = await surveyModel.projectData()

        const totalProject = await surveyModel.totalProject()

        res.render('survey/survey_home', {
            title: 'Survey Project',
            data: data,
            totalProject: totalProject
        })
    }
    catch (error) {
        console.error(`Error from surveyHome ::${error}`)
    }
}
module.exports.surveyHome = surveyHome

//

//ฟอร์มสำหรับการบันทึกรายละเอียด Project
const formProject = async (req, res) => {
    try {
        const { project_name, project_year, project_location } = req.body
        await surveyModel.surveyProjectSaveData(project_name, project_year, project_location)

        res.redirect('/survey/')
    }
    catch (error) {
        console.log(`Error form from project :: ${error}`)
        throw error
    }
}
module.exports.formProject = formProject





//ดึงข้อมูลจาก Database ตาม ID ของแต่ละโปรเจค
const projectById = async (req, res) => {
    try {
        const id = req.params.id // รับค่าผ่าน URL
        const ProjectByID = await surveyModel.surveyProjectById(id)

        //inventoryData
        const inventory = await inventoryModel.InvenData()

        //ตรวจสอบว่ามีข้อมูลเข้ามาไหม
        if (!projectById) {
            return res.status(400).send('Project ID is Invalid')
        }

        res.render('survey/survey_form', {
            title: `Project ${ProjectByID.name}`,
            project: ProjectByID,
            inventory: inventory
        })
    }
    catch { }
}
module.exports.projectById = projectById