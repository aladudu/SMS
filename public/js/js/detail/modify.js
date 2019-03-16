function Modify(){
    this.btn = $("#modify_btn");
    this.init();
}

Modify.prototype = {
    init(){
        this.modifyBtn();
    },
    modifyBtn(){
        this.btn.on("click",$.proxy(this.handleModifyBtn,this))
    },
    handleModifyBtn(){
            //创建formData 模拟表单提交数据  兼容性问题
            var formData = new FormData();
            var jobName = $("#job_modify_name");
            var jobPrice = $("#job_modify_price");
            var jobAsk = $("#job_modify_ask");
            var companyName = $("#company_modify_name");
            var logo = $("#logo_modify");
            var id = this.btn.attr("data-id");
          
            
            //append key val  key是服务端接收的key值
            formData.append("jobname",jobName.val());
            formData.append("jobprice",jobPrice.val());
            formData.append("jobask",jobAsk.val());
            formData.append("companyname",companyName.val());
            formData.append("companylogo",logo[0].files[0]);
            formData.append("id",id);
           
    
            $.ajax({
                type:"post",
                url:"/job/modifyjob",
                data:formData,
                cache:false,
                contentType:false,
                processData:false,
                success:$.proxy(this.handleSuccess,this)
            })
    },
    handleSuccess(data){
       if(data.status){
            new JobList().getList();
       }
    }
}

new Modify();