function Register(container){
    this.container = container;
    this.init();
}

Register.template = `
<div class="login">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form class="form">
                <div class="form-group">
                    <label for="register_username">用户名</label>
                    <input type="email" class="form-control" id="register_username" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="register_password">密码</label>
                    <input type="password" class="form-control" id="register_password" placeholder="Password">
                </div>
                <div class="form-group">
                    <div class="alert alert-danger" role="alert">忘记密码?</div>
                    <div class="alert alert-info" role="alert" id="js_login">去登陆</div>
                </div>
                <button type="button" class="btn btn-info login_btn" id="login_btn">注册</button>
            </form>
        </div> 
`

Register.prototype = {
    init:function(){
        this.createDom();
        this.handlePush();
        this.handleRegister();
    },
    createDom:function(){
        this.el = $("<div class='content'></div>");
        this.el.append(Register.template);
        this.container.append(this.el);
    },
    handlePush(){
        this.el.find("#js_login").on("click",$.proxy(this.handleLogin,this))  
    },
    handleLogin(){
         new Page().createContent(true);
    },
    handleRegister(){
        this.el.find("#login_btn").on("click",$.proxy(this.handleRegisterBtn,this))
    },
    handleRegisterBtn(){
       var username = this.el.find("#register_username").val();
       var password = this.el.find("#register_password").val();
       var userInfo = {
           username,
           password
       }
       
        $.ajax({
            type:"post",
            url:"/api/register",
            data:userInfo,
            dataType:"json",
            success:$.proxy(this.handleRegisterSuccess,this)
        })
    },
    handleRegisterSuccess(data){
        if(data.status){
            alert("注册成功");
            new Page().createContent(true);
        }
    }
}