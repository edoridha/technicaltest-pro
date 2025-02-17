const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.get('/admins', Controller.getAdmin)
router.post('/members', Controller.createMember)
router.post('/members/login', Controller.memberLogin)
router.get('/members', Controller.memberList)

module.exports = router