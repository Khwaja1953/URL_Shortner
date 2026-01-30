const express = require('express')
const {handleCreateUrl, handleGetUrl} = require('../Controllers/urlController')
const router = express.Router()

router.post('/',handleCreateUrl)


module.exports = router