const {getUser} = require('../Services/token')

const handleVerifyUser = async (req,res,next)=>{
    try{

        const {uuid} = req.cookies;
        
        if (!uuid){
            return res.redirect('login')
        }
        const user = getUser(uuid);
        if(!user) return res.redirect('login')
            req.body = {
        ...req.body,
        user: user
    };
    next()
}
catch(error){
    return res.render('login',{error: error, message: null})
}
}

module.exports = {handleVerifyUser}