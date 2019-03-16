function Login(container){
    this.container = container;
    this.init();
}

Login.template = `
<div class="login">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form class="form">
                <div class="form-group">
                    <label for="login_username">用户名</label>
                    <input type="email" class="form-control" id="login_username" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="login_password">密码</label>
                    <input type="password" class="form-control" id="login_password" placeholder="Password">
                </div>
                <div class="form-group">
                    <div class="alert alert-danger" role="alert">忘记密码?</div>
                    <div class="alert alert-info" role="alert" id="js_register">去注册</div>
                </div>
                <button type="button" class="btn btn-info login_btn" id="login_btn">登陆</button>
            </form>
        </div> 
`

Login.prototype = {
    init(){
        this.createDom();
        this.handlePush();
        this.loginBtn();
    },
    createDom:function(){
        this.el = $("<div class='content'></div>");
        this.el.append(Login.template);
        this.container.append(this.el);
    },
    handlePush(){
       this.el.find("#js_register").on("click",$.proxy(this.handleRegister,this))  
    },
    handleRegister(){
        new Page().createContent(false);
    },
    loginBtn(){
        this.el.find("#login_btn").on("click",$.proxy(this.handleLoginCallBack,this))
    },
    handleLoginCallBack(){
        var userInfo = {
            username:this.el.find("#login_username").val(),
            password:this.el.find("#login_password").val()
        }
       
        $.ajax({
            type:"post",
            url:"/api/login",
            data:userInfo,
            success:$.proxy(this.handleLoginSucc,this)
        })
    },
    handleLoginSucc(data){
        if(data.status){
            location.href="http://localhost:3000/html/detail.html"
        }
    }
}