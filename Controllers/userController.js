const User = require('../Models/UserModel');
const {setUser, getUser} = require('../Services/token')
// const {v4: uuidv4} = require('uuid')


//singup handle
const handleSignup = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user) return res.render('login',{error:"account already exists",message:null})
        const newUser = await User.create({name,email,password});
        return res.render('login',{error: null,message:"account created successfully please login"});


    }
    catch(error){
        res.render('signup',{error: "something went wrong please try later"})
    }

}


//user login
const handleLogin = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email,password});
        if (!user){
            return res.render('login',{message: null,error: "invalid email or password"})
        }
        // const token = uuidv4();
        const token = setUser(user);
        res.cookie('uuid',token);
        return res.redirect('/',)

    }
    catch(error){
        res.render('login',{error: "something went wrong please try later"})
    }

}



module.exports = {handleSignup, handleLogin}