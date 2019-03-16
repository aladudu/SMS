const mongoose = require("../util/database").mongoose;

const Job = mongoose.model("job",{
    jobname:String,
    jobprice:String,	
    jobask:String,     
    companyname:String, 
    companylogo:String
})


const addJob = (JobInfo,cb)=>{
    
    const job = new Job(JobInfo)

    job.save().then((res)=>{
        cb(res);
    })
}




const getjob = (jobInfo,cb)=>{
    let count;
   Job.find().then((res)=>{
     count = res.length;
   })
    Job.find().skip((jobInfo.page-1)*jobInfo.limit).limit(Number(jobInfo.limit)).then((res)=>{
       
        cb(res,count)
    })
}



const removejob = (jobInfo,cb)=>{
    Job.remove(jobInfo).then((res)=>{
       
        cb(res)
    })
}

const findjob = (jobInfo,cb)=>{
    Job.findOne(jobInfo).then((res)=>{
        
        cb(res)
    })
}


const modifyjob = (jobInfo,updateInfo,cb)=>{
    Job.update(jobInfo,{$set:updateInfo}).then((res)=>{
        cb(res)
    })
}

module.exports = {
    addJob,
    getjob,
    removejob,
    findjob,
    modifyjob
}