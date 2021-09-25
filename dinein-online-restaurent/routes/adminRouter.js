const router = require('express').Router()
const adminCtrl = require('../controllers/adminController')
const auth = require('../middleware/auth')


router.post('/register', adminCtrl.register)
router.post('/login', adminCtrl.login)
router.get('/logout', adminCtrl.logout)

router.get('/refresh_token', adminCtrl.refreshToken)
router.get('/infor',auth, adminCtrl.getAdmin)
router.patch('/addorder',auth, adminCtrl.addOrder )
module.exports = router