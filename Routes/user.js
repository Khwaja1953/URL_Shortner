const express = require('express');
const multer = require('multer');
const {handleSignup, handleLogin, handleProfile} = require('../Controllers/userController')
const {handleVerifyUser} = require('../Middlewares/auth')
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ProfilePhotos')
  },
  filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })
router.post('/signup',upload.single('profile'),handleSignup);
router.post('/login',handleLogin)
router.get('/profile',handleVerifyUser,handleProfile)

module.exports = router