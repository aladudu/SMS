var express = require('express');
var router = express.Router();
var jobController = require("../controller/job");
var cpUpload = require("../util/multer").cpUpload;







//增加职位
router.post("/addjob",cpUpload,jobController.addjob)
//删除职位
router.get("/deljob",jobController.deljob)
//获取职位
router.get("/getjob",jobController.getjob)

//获取指定职位
router.get("/findjob",jobController.findjob)
//修改
router.post("/modifyjob",cpUpload,jobController.modifyjob)

module.exports = router;