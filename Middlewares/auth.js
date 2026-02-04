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
const restrictTo = (role)=>{
    return function(req,res,next){
        if(!req.body.user){
            return res.redirect('/login')
        }
       
        if (!role.includes(req.body.user.role)){
            return res.end("unauthorized")
        }
        return next()
    }

}
module.exports = {handleVerifyUser, restrictTo}