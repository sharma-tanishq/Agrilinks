const mongoose = require('mongoose')

const mongooseURI=`mongodb://localhost:27017/Agrilinks?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`

const connectToMongoose =()=>{
    mongoose.connect(mongooseURI,{keepAlive:true},()=>console.log('Connected to mongoDB succesfully'));
}

module.exports =connectToMongoose;