const express = require('express');
const UrlModel = require('../Models/UrlModel')
const {handleGetUrl} = require('../Controllers/urlController')
const router = express.Router();

router.get('/',async (req,res)=>{

    const allUrls = await UrlModel.find({})
    return res.render('home.ejs',{allUrls})
});
router.get('/:shortid',handleGetUrl)

module.exports = router