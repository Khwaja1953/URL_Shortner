const {getUser} = require('../Services/token')

const handleVerifyUser = async (req,res,next)=>{
    const {uuid} = req.cookies;
    
    if (!uuid){
        return res.redirect('login')
    }
    next()
}

module.exports = {handleVerifyUser}