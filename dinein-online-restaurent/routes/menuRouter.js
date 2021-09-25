const router = require('express').Router()
const menuCtrl = require('../controllers/menuController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/menu')
    .get(menuCtrl.getMenu)
    .post(menuCtrl.createMenu)


router.route('/menu/:id')
    .delete(menuCtrl.deleteMenu)
    .put(menuCtrl.updateMenu)

//auth, authAdmin,

module.exports = router