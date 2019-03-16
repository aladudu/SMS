const mongoose = require("../util/database").mongoose;

const User = mongoose.model("user",{
    username:String,
    password:String
})

//查
const userFind = (userInfo,cb)=>{
    User.findOne(userInfo).then((res)=>{
        cb(res)
    })
}

//增
const userAdd = (userInfo,cb)=>{
    let user = new User(userInfo);
    user.save().then((res)=>{
        cb(res);
    })
}

module.exports = {
    userFind,
    userAdd
}