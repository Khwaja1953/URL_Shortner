const User = require('../Models/UserModel');
const { setUser, getUser } = require('../Services/token')
// const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const transporter = require('../Utils/nodemailer');



//singup handle
const handleSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { filename } = req.file;
        const user = await User.findOne({ email });
        if (user) return res.render('login', { error: "account already exists", message: null })
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const otp = Math.floor(Math.random() * 9000 + 1000)
        // console.log(otp);
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for URL-Shortner",
            text: `your otp for url shortner is ${otp} please do not share with anyone`, // Plain-text version of the message

        });
        // console.log(info)
        const newUser = await User.create({ name, email, password: hash, profile: filename, storedOtp: { otp: otp } });
        // console.log(newUser)
        return res.render('verifyOtp', { error: null, email: email });


    }
    catch (error) {
        res.render('signup', { error: `something went wrong please try later ${error}` })
    }

}


//user login
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { message: null, error: "invalid email or password" })
        }
        if ( await User.findOne({email: email, isVerified: false})){
          return  res.render('verifyOtp',{error: null, email: email, message: "please verify your account first"})
        }

        if(!bcrypt.compareSync(password, user.password)){
           return res.render('login',{error: "invalid password", message: null})
        }
        // const token = uuidv4();
        const token = setUser(user);
        res.cookie('uuid', token);
        return res.redirect('/',)

    }
    catch (error) {
     return   res.render('login', { error: "something went wrong please try later" })
    }

}

const handleProfile = async (req, res) => {
    try {
        const { email } = req.body.user;
        const user = await User.findOne({ email });
        return res.render('profile.ejs', { name: user.name, email: user.email, role: user.role, profile: user.profile, error: null })

    }
    catch (error) {
        return res.render('profile.ejs', { name: null, email: null, role: null, profile: null, error: error })
    }
}

const handleVerifyOtp = async (req,res)=>{
    try{
        const {email, otp} = req.body;
        // console.log(email, otp)
        const user = await User.findOne({email})
        if (!user){
          return res.render('verifyOtp.ejs',{error: "invalid email", email: null})
        }
        // console.log(otp, user.storedOtp.otp);
        if (otp == user.storedOtp.otp && Date.now() < user.storedOtp.validTill){
            await User.findOneAndUpdate({email},{isVerified: true});
           return res.render('login.ejs',{error: null, message: "account successfully verified please login"})
        }
        return res.render('verifyOtp.ejs',{error: "invalid otp or expired otp", email: email})

    }
    catch (error){
        return res.render('verifyOtp.ejs', { error: error, email: null })
    }
}


module.exports = { handleSignup, handleLogin, handleProfile, handleVerifyOtp }