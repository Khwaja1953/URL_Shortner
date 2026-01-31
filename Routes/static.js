const express = require('express');
const UrlModel = require('../Models/UrlModel')
const {handleGetUrl} = require('../Controllers/urlController')
const router = express.Router();
const {handleVerifyUser} = require('../Middlewares/auth')

router.get('/',handleVerifyUser,async (req,res)=>{

    const allUrls = await UrlModel.find({})
    return res.render('home.ejs',{allUrls})
});

router.get('/login',(req,res)=>{
    return res.render('login',{error: null,message:null})
})
router.get('/signup',(req,res)=>{
    return res.render('signup',{error: null,message:null})
})
module.exports = router