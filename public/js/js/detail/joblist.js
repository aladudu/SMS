function JobList() { 
    this.container = $("#jobList");
    this.clear = $("#addJob");
    this.flag = true
   
}
JobList.prototype = {
    init(){
       this.getList()
    },
    getList(page=1,limit=2){
        
        page!=1?this.flag = false : this.flag = true;
        $.ajax({
            type:"get",
            url:"/job/getjob",
            data:{
                page,
                limit    
            },
            dataType:"json",
            cache:false,
            success:$.proxy(this.handleSuccess,this)
        })
    },
    handleSuccess(data){
        if(data.status){
            
            this.el  = $("<div class='list'></div>")
            var str = ""
            for(var i=0;i<data.data.length;i++){
                str+=`<div class="list_job">
                <div class="job_des">
                     <div class="job_name">${data.data[i].jobname}</div>
                     <div class="job_price">${data.data[i].jobprice}</div>
                     <div class="job_ex">${data.data[i].jobask}</div>
                </div>
                <div class="com_des">
                    <div class="company_logo">
                        <img src=${data.data[i].companylogo}>
                    </div>
                    <div class="company_name">${data.data[i].companyname}</div>
                </div>
                <div class="operation" data-id=${data.data[i]._id}>
                    <button class="btn btn-danger js_del">删除</button>
                    <button class="btn btn-info js_modify" data-toggle="modal" data-target="#jobModel">修改</button>
                </div>
             </div>`
            }

            this.el.append(str);
            if(this.flag){
            this.handleRenderList(this.el,data.count,LayPage)
            //this.handleRenderList(this.el,data.count,this.flag?LayPage:"");
             }else{
                this.handleRender(this.el);
             }
           
           

        }
    },
    // handleRender(val){
    //     this.container.html(val);
    //     var _this = this;
    //     this.el.find(".js_del").on("click",_this,$.proxy(this.handleDel))
       
    // },
    // handleDel(e){
    //     var id =  $(this).parent().attr("data-id");
    //     var flag = confirm("您确定要删除吗?");
    //     if(flag){
    //         $.ajax({
    //             type:"get",
    //             url:"/job/deljob",
    //             data:{
    //                 id
    //             },
    //             cache:false,
    //             dataType:"json",
    //             success:$.proxy(e.data.handleDelSucc,e.data)
    //         }) 
    //     }
        
    // }, 
    handleRenderList(val,n,LayPage){
        this.clear.html("");
        this.container.html(val);
        new LayPage(n);
        $.each(this.el.find(".js_del"),$.proxy(this.handleEach,this))
        //修改
        this.handleModify();
    },
    handleRender(val){
        this.container.html(val);
        $.each(this.el.find(".js_del"),$.proxy(this.handleEach,this))
        //修改
        this.handleModify();
    },
    handleEach(i){
        this.el.find(".js_del").eq(i).on("click",i,$.proxy(this.handleDel,this))
    },
    handleDel(e){
        var id =  this.el.find(".js_del").eq(e.data).parent().attr("data-id");
        var flag = confirm("您确定要删除吗?");
        if(flag){
            $.ajax({
                type:"get",
                url:"/job/deljob",
                data:{
                    id
                },
                cache:false,
                dataType:"json",
                success:$.proxy(this.handleDelSucc,this)
            }) 
        }
        
    },
    handleDelSucc(data){
       if(data.status){
          this.el = "";
          this.getList(); 
       }
    },
    handleModify(){
       var _this = this;
       this.el.find(".js_modify").on("click",_this,$.proxy(this.handleModifyBtn))
    },
    handleModifyBtn(e){
        let id = $(this).parent().attr("data-id");
        $.ajax({
            type:"get",
            url:"/job/findjob",
            data:{
                id
            },
            dataType:"json",
            success:$.proxy(e.data.handleSucc,e.data)
        })
    },
    handleSucc(data){
        var modifyname = $("#job_modify_name");
        var modifyprice = $("#job_modify_price");
        var modifyask = $("#job_modify_ask");
        var modifycompanyname = $("#company_modify_name");
        var modify_btn = $("#modify_btn");
        modifyname.val(data.data.jobname);
        modifyprice.val(data.data.jobprice);
        modifyask.val(data.data.jobask);
        modifycompanyname.val(data.data.companyname);
        modify_btn.attr("data-id",data.data._id)
    }
}

