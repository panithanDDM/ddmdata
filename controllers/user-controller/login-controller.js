const bcrypt = require('bcrypt')

//connect data base 
const { pool } = require('../../utilities/poolConfig')

//MOdel
const userModel = require('../../models/user-model')








// render Login page
const loginPage = (req, res) => {
    res.render('index', {
        flash: req.flash(),
        title: `DDM APP`,
    })
}
module.exports.loginPage = loginPage





// Login System
const loginSystem = async (req, res) => {
    const { username, password } = req.body

    try {
        // use model for SQL data
        const result = await userModel.loginModel(username, password)

        if (result.rows.length > 0) {
            const user = result.rows[0]
            //ค่าเป็น true
            const match = await bcrypt.compare(password, user.password)

            //ถ้าเป็น True
            if (match) {
                //ให้เก็บ session โดยเอาข้อมูลมาจาก ID
                req.session.userId = user.user_id
                res.redirect('/home/')

            } else {
                req.flash('error', 'INVALID PASSWORD')
                res.redirect('/')
                console.log('รหัสผ่านผิดผลาด')
            }
        } else {
            req.flash('error', 'NOT FOUND USERNAME FOR LOGIN')
            res.redirect('/')
        }
    }
    catch (error) {
        console.error(error)
    }
}
module.exports.loginSystem = loginSystem



// LOGOUT CONTROL
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
module.exports.logout = logout








