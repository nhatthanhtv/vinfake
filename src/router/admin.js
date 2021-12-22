const express = require('express');
const router = express.Router()

const adminController = require('../app/controllers/AdminController')


router.get('/orderlist', adminController.orderlist)
router.post('/', adminController.login)
router.get('/', adminController.index)

module.exports = router