let token = Cookies.get("token");
if(!token){
   location.href="http://localhost:3000/";
}
let username = Cookies.get("userInfo");
$("#js_userName").text(username)

