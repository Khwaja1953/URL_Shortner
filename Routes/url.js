const express = require('express')
const {handleCreateUrl, handleGetUrl} = require('../Controllers/urlController')
const {handleVerifyUser} = require('../Middlewares/auth')
const router = express.Router()

router.post('/', handleVerifyUser, handleCreateUrl);
router.get('/:shortid',handleGetUrl)


module.exports = router