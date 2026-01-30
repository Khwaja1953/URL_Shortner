const UrlModel = require('../Models/UrlModel')
const shortid = require('shortid');

const handleCreateUrl = async (req,res)=>{
    try{
        const allUrls = await UrlModel.find({})
        const {url} = req.body;
    if(!url){
        return res.render('home.ejs',{message: null, error: "please enter url",allUrls})
    }
    const existingUrl = await UrlModel.findOne({url});
    console.log(existingUrl)

    if(existingUrl){
        return res.render('home.ejs',{message: existingUrl.shortUrl, error: null, allUrls})
    }
    const shortUrl = shortid.generate();
    console.log(shortUrl)
    const savedUrl = await UrlModel.create({url,shortUrl})

    return res.render('home.ejs',{message: savedUrl.shortUrl, error: null, allUrls})
    }
    catch(error){
        return res.render('home.ejs',{message: null, error: error,allUrls})
    }
}

const handleGetUrl = async (req,res)=>{
    try{
        const {shortid} = req.params;
    if(!shortid){
        return res.status(400).json({error:"not valid url"})
    }
    const existingUrl = await UrlModel.findOne({shortUrl: shortid})
    if (existingUrl){
        await UrlModel.findOneAndUpdate({shortUrl: shortid},{$push:{visitHistory:Date.now()}})
        return res.redirect(existingUrl.url)
    }else{
        return res.status(404).json({message: "not a valid id"})
    }
    }
    catch(error){
        return res.status(500).json({error:"something went wrong please try again"})
    }
    

}
module.exports = {handleCreateUrl, handleGetUrl}