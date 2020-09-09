const router = require('express').Router()

router.use('/api', require('./blogpostRoutes.js'))
router.use('/api', require('./userRoutes.js'))

module.exports = router