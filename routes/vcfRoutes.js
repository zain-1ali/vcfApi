const express = require('express')
const convertVcf = require('../controllers/vcfController')

const router = express.Router()



router.post('/convertVcf', convertVcf)


module.exports = router;