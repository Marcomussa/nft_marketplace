const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const path = require('path')

router.get('/', controller.index)

module.exports = router