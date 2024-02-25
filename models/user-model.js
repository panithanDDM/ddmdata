const bcrypt = require('bcrypt')
const { Pool } = require('pg')

//connect data base 
const { pool } = require('../utilities/poolConfig')

// Create user 

//LOGIN model
const loginModel = async (username, password) => {
    try {
        const query = 'SELECT * FROM user_profile WHERE username = $1'
        const values = [username]
        const result = await pool.query(query, values)
        return result
    }
    catch (error) {
        console.error('Error', error)
        throw new Error(error)
    }
}
module.exports.loginModel = loginModel



//USER REGISTER
const userRegister = async (email, username, password) => {
    try {

        const hashPassword = await bcrypt.hash(password, 2)
        const query = 'INSERT INTO user_profile (username, email, password, role) VALUES ($1, $2, $3,$4)'
        const valuse = [username, email, hashPassword, 'user']
        await pool.query(query, valuse)

        console.log('User create Succesfully')
    }
    catch (error) {
        console.error('ERROR FOR REGISTER MODEL :', error)
        throw new Error(error)
        res.render('error')
    }
}
module.exports.userRegister = userRegister



