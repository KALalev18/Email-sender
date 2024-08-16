const router = require('express').Router()

const {sign_up, get_bill} = require('../controller/app-controller.js')

// making our request

router.post('/user/sign_up', sign_up)
router.post('/product/get_bill', get_bill)

module.exports = router