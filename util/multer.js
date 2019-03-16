const multer = require("multer");
//第一件事情 读文件     将文件放在指定的区域
//第二件事件 更改文件名称

//配置项
var storage = multer.diskStorage({
    
    //将上传的文件存储在指定的位置
    destination: function (req, file, cb) {
       
      cb(null, './public/imgs')
    },
    //将上传的文件做名称的更改
    filename: function (req, file, cb) {
       
      cb(null,  Date.now()+"-"+file.originalname)
    }
  })

var upload = multer({ storage: storage })
//指定当前字段可以携带多个文件
var cpUpload = upload.fields([{ name: 'companylogo', maxCount: 1 }])


module.exports = {
    cpUpload
}