var jobModel = require("../model/job");
const addjob = (req,res)=>{
  
    let {jobname,jobprice,jobask,companyname} = req.body;
    console.log(req.files)
    let path =req.files.companylogo[0].path;
    //在服务端\不能直接进行使用 \\  
    var reg = /public\\imgs\\(.+)/
   
   var newPath = path.replace(reg,($0,$1)=>{
        var str = "http://localhost:3000/imgs/";
        return str+= $1;
    })

    jobModel.addJob({jobname,jobprice,jobask,companyname,companylogo:newPath},(data)=>{
        if(data){
            res.json({
                status:true,
                info:"添加成功"
            })
        }else{
            res.json({
                status:false,
                info:"添加失败"
            })
        }
    })
}


const getjob = (req,res)=>{
    let {page,limit} = req.query;
   
    jobModel.getjob({page,limit},function(data,count){
     
        if(data.length>0){
            res.json({
                status:true,
                info:"获取成功",
                data,
                count
            })
        }else{
            res.json({
                status:false,
                info:"网络错误",
            })
        }
    })
}



const deljob = (req,res)=>{
    let {id} = req.query;
    jobModel.removejob({_id:id},function(data){
        
        if(data){
            res.json({
                status:true,
                info:"OK"
            })
        }else{
            res.json({
                status:false,
                info:"NO"
            })
        }
    })
}

const findjob = (req,res)=>{
    let {id} = req.query;
    jobModel.findjob({_id:id},function(data){
        res.json({
            status:true,
            data:data,
            info:"OK"
        })
    })
}



const modifyjob = (req,res)=>{

    let {jobname,jobprice,jobask,companyname,id} = req.body;
   
    let path =req.files.companylogo[0].path;
    //在服务端\不能直接进行使用 \\  
    var reg = /public\\imgs\\(.+)/
   
   var newPath = path.replace(reg,($0,$1)=>{
        var str = "http://localhost:3000/imgs/";
        return str+= $1;
    })

    jobModel.modifyJob({_id:id},{jobname,jobprice,jobask,companyname,companylogo:newPath},(data)=>{
        res.json({
            status:true,
            info:"OK"
        })
    })
}

module.exports = {
    addjob,
    getjob,
    deljob,
    findjob,
    modifyjob
}