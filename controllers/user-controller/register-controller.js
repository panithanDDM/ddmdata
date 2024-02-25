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


// userModel.loginModel



const createUser = async (req, res) => {
    const { username, email, password, ConfirmPassword } = req.body
    console.log(username, email, password, ConfirmPassword)
    try {
        if (password !== ConfirmPassword) {
            req.flash('error', 'Password do not macth')
            res.redirect('/register/')
        } else {
            await userModel.userRegister(email, username, password)
            res.redirect('/')
        }
    }
    catch (error) {
        console.error(error)
        res.send('INVALID SERVER ERROR REGISTER SYSTEM CONTECT "DDM"')
    }
}
module.exports.createUser = createUser