const { pool } = require('../utilities/poolConfig')






//สำหรับการนำข้อมูลจาก Data base มาแสดงที่ตาราง Project Name
const projectData = async () => {
    try {
        const query = `SELECT * FROM survey_project ORDER BY id DESC`
        const result = await pool.query(query)
        return result.rows
    }
    catch (error) {
        console.error(`Error from projectData :: ${error} `)
    }
}
module.exports.projectData = projectData




//สำหรับการบันทึกข้อมูลจากฟอร์มชื่อโปรเจคเข้าสู่ฟอร์ม
const surveyProjectSaveData = async (project_name, project_year, project_location) => {
    try {
        const query = `INSERT INTO survey_project (name, year, location) 
                        VALUES ($1, $2, $3)`
        const value = [project_name, project_year, project_location]
        await pool.query(query, value)
    }
    catch (error) {
        console.log(`Error From surveyProjectSaveData :: ${error}`)
        throw error
    }
}
module.exports.surveyProjectSaveData = surveyProjectSaveData


//สำหรับการดึงข้อมูล Project ตาม ID 
const surveyProjectById = async (id) => {
    try {
        const query = `SELECT * FROM survey_project WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }
    catch (error) {
        console.error(`Error from surveyProjectById :: ${error}`)
        throw error
    }
}
module.exports.surveyProjectById = surveyProjectById




//model สำหรับการคำนวนจำนวนทั้งหมดของ Project
const totalProject = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM survey_project`
        const result = await pool.query(query)
        return result.rows[0].total
    }
    catch (error) {
        console.log(`Error from totalProject model :: ${error}`)
        throw error
    }
}
module.exports.totalProject = totalProject



//model สำหรับกาาคำนวนจำนวนทั้งหมดของ survey recorf 
const totalSurvey = async () => {
    try {
        const query = `SELECT COUNT(*) AS total FROM`
    }
    catch (error) {
        console.error(`Error from totaleSurvey model :: ${error}`)
        throw error
    }
}
module.exports.totalSurvey = totalSurvey