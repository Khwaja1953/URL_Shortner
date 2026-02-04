// const myDairy = new Map()
const jwt = require('jsonwebtoken')
const secretKey = "ilssrinagar123"
const setUser =  (user)=>{
// myDairy.set(token,user)
return jwt.sign({_id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
},secretKey,{ expiresIn: '1d' })

}

const getUser =  (token)=>{
    // const user = myDairy.get(token)
    const user = jwt.verify(token,secretKey)
    return user

}

module.exports = {setUser,getUser}