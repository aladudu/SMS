var express = require('express');
var router = express.Router();
var userController = require("../controller/user");
/* /api/register */
router.post('/register',userController.register);
//登陆 /api/login
router.post('/login',userController.login);





module.exports = router;


/*
    MVC模式
        架构思想
        M:model层  数据的增删改查
        V:view层   视图的展示
        C:controller层   负责业务逻辑

    MVP

    MVVM

*/
