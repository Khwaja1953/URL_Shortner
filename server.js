const express = require('express');
const connectDB = require('./Utils/dbConnection');
const cookieParser = require('cookie-parser');
const path = require('path');


// importing routes 
const urlRoute = require('./Routes/url');
const staticRoute = require('./Routes/static')
const userRoute = require('./Routes/user')




const ejs = require('ejs');
const app = express();
const PORT = 3000;

//mongodb connection
connectDB('mongodb://localhost:27017/urlProject')
.then(()=>{console.log("mongodb connected successfully")})
.catch(error => {console.log(error)})


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')
app.use(cookieParser())


//my routes 
app.use('/',staticRoute);
app.use('/url',urlRoute);
app.use('/user',userRoute);
app.use("/ProfilePhotos",express.static(path.join(__dirname,'ProfilePhotos')));


app.listen(PORT,()=>{
    console.log(`server is running at localhost:${PORT}`)
})
