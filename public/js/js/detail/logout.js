function Logout(){
    this.init();
}

Logout.prototype = {
    init(){
        this.outBtn()
    },
    outBtn(){
        $("#js_logout").on("click",$.proxy(this.handleLogoutBtn,this))
    },
    handleLogoutBtn(){
        Cookies.remove("token");
        location.reload();
    }
}

new Logout();