const {getUser} = require('../Services/token')

const handleVerifyUser = async (req,res,next)=>{
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

module.exports = {handleVerifyUser}