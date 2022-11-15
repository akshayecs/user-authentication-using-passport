const mongoose = require('mongoose');

exports.connectMongoose = () => {

    mongoose
    .connect('mongodb://localhost:27017/passport')
    .then((e) => console.log(`Connected to mongDB:${e.connection.host}`))
    .catch((err) => console.log(err));
}

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
})

exports.User = mongoose.model("User",userSchema)