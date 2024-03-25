//MOdel
const userModel = require('../../models/user-model')

// render page register
const registerPage = (req, res) => {
    res.render('user/register', {
        flash: req.flash(),
        title: `Register`,
    })
}
module.exports.registerPage = registerPage


const createUser = async (req, res) => {
    const { username, email, password, ConfirmPassword } = req.body
    console.log(username, email, password, ConfirmPassword)

    try {
        // ฟังชั่นการตรวจสอบว่ามี Username ในระบบหรือยัง
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) { // ถ้ามี Username ในระบบแล้ว
            req.flash('error', 'Email is already registered');
            return res.redirect('/register/');
        } else { //ถ้ายังไม่มี Username ในระบบ
            if (password !== ConfirmPassword) { //ถ้ารหัสผ่านไม่ตรงกัน
                req.flash('error', 'Password do not macth')
                res.redirect('/register/')
            } else {
                await userModel.userRegister(email, username, password)
                res.redirect('/')
            }
        }
    }
    catch (error) {
        console.error(error)
        res.send('INVALID SERVER ERROR REGISTER SYSTEM CONTECT "DDM"')
    }
}
module.exports.createUser = createUser