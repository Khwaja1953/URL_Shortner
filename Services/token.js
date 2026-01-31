const myDairy = new Map()

const setUser =  (token, email)=>{
myDairy.set(token,email)

}

const getUser =  (token)=>{
    const email = myDairy.get(token)
    return email

}

module.exports = {setUser,getUser}