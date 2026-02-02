const myDairy = new Map()

const setUser =  (token, user)=>{
myDairy.set(token,user)

}

const getUser =  (token)=>{
    const user = myDairy.get(token)
    return user

}

module.exports = {setUser,getUser}