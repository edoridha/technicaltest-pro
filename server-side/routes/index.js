const router = require('express').Router()
const Controller = require('../controllers')
const authAdmin = require('../middlewares/auth.admin')
const authMember = require('../middlewares/auth.member')

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.get('/admins', Controller.getAdmin)
router.post('/admins/login', Controller.loginAdmin)
router.post('/members', Controller.createMember)
router.post('/members/login', Controller.memberLogin)
router.get('/members', authAdmin, Controller.memberList)
router.get('/profile', authMember, Controller.getProfile)

module.exports = router