const userModel = require("../model/user");
//引入加密模块  1.
const crypto = require('crypto');
//引入token
const jwt = require("jsonwebtoken");

const register = (req,res)=>{
    let {username,password} = req.body;
 
    userModel.userFind({username},function(data){
        if(!data){
            //存
            //创建sha256算法  2.
            const hash = crypto.createHash('sha256');
            //需要加密的字符 3.
            hash.update(password);
           
            //对密码进行加密 4.
            userModel.userAdd({
                username:username,
                password:hash.digest('hex')
            },function(){
               res.json({
                status:true,
                Info:"注册成功"
               })
            })
        }else{
            res.json({
                status:false,
                Info:"用户名已存在"
            })
        }
    })
}


const login = (req,res)=>{
    //获取用户名和密码
    let {username,password} = req.body;
    //查看当前用户名是否存在 如果不存在告诉用户用户名不存在  如果存在则进行密码判断
    userModel.userFind({username},function(data){
        if(data){
            //创建sha256算法
            const hash = crypto.createHash('sha256');
            //进行加密
            hash.update(password);
            //因为数据库中的密码是加密的  所以我们进行对比的时候也需要进行加密在对比
            if(data.password == hash.digest('hex')){

                //设置token
                let token = jwt.sign({username},"bk1824",{'expiresIn':'1h'})
                //种cookie
                res.cookie("token",token)
                res.cookie("userInfo",username)

                //成功
                res.json({
                    status:true,
                    info:"登陆成功",
                })
            }else{
                //失败
                res.json({
                    status:false,
                    info:"密码错误"
                })
            }

        }else{
            //用户名不存在
            res.json({
                status:false,
                info:"用户名不存在"
            })
        }
    })
}

module.exports = {
    register,
    login
}


/*
    md5加密  解密

    sha256加密


    123456 + bk1824 + 秘钥 = 随机字符串



    token


    1、安装
        cnpm install jsonwebtoken -S

    2、引入
        const jwt = require("jsonwebtoken");

    3、设置token
        jwt.sign(payload,秘钥,过期时间)
        payload：相关信息
        秘钥:随机字符
        过期时间 token什么时候过期
*/