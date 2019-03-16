function Job() {
    this.content = $("#addJob");
    this.clear = $("#jobList");
    this.init()
}

Job.template = `
<form>
                    <div class="form-group">
                        <label for="job_name">职位名称</label>
                        <input type="text" class="form-control" id="job_name" placeholder="请输入职位名称">
                    </div>
                    <div class="form-group">
                        <label for="job_price">薪资</label>
                        <input type="text" class="form-control" id="job_price" placeholder="薪资范围">
                    </div>
                    <div class="form-group">
                        <label for="job_ask">要求</label>
                        <input type="text" class="form-control" id="job_ask" placeholder="招聘要求">
                    </div>
                    <div class="form-group">
                        <label for="company_name">公司名称</label>
                        <input type="text" class="form-control" id="company_name" placeholder="请输入公司名称">
                    </div>
                    <div class="form-group">
                        <label for="logo">上传公司logo</label>
                        <input type="file" id="logo" multiple>
                    </div>
                    <button type="button" class="btn btn-default" id="js_jobBtn">提交</button>
                </form>
`


Job.prototype = {
    init(){
        this.createDom();
        this.JobClick();
    },
    createDom(){
        this.el = $("<div class='from'></div>");
        this.el.append(Job.template);
        this.clear.html("")
        this.content.html(this.el)
    },
    JobClick(){
        this.el.find("#js_jobBtn").on("click",$.proxy(this.handleJobCB,this))
    },
    handleJobCB(){
        //创建formData 模拟表单提交数据  兼容性问题
        var formData = new FormData();
        var jobName = this.el.find("#job_name");
        var jobPrice = this.el.find("#job_price");
        var jobAsk = this.el.find("#job_ask");
        var companyName = this.el.find("#company_name");
        var logo = this.el.find("#logo");
        
      
        
        //append key val  key是服务端接收的key值
        formData.append("jobname",jobName.val());
        formData.append("jobprice",jobPrice.val());
        formData.append("jobask",jobAsk.val());
        formData.append("companyname",companyName.val());
        formData.append("companylogo",logo[0].files[0]);
       
       

        $.ajax({
            type:"post",
            url:"/job/addjob",
            data:formData,
            cache:false,
            contentType:false,
            processData:false,
            success:$.proxy(this.handleSuccess,this)
        })
    },
    handleSuccess(data){
       if(data.status){
           alert("添加成功");
           new JobList().getList();
       }
    }
}

