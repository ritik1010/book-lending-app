
async function login(){
var email=document.getElementById("emailText").value;
var password=document.getElementById("passwordText").value;
var request={
    email,
    password}

var response=    await xhttpRequest("POST",request,"users/login",(response)=>{
    if(response=="Invalid password or username"){
        alert(response)
    }
    else{   
        
        res=JSON.parse(response)
        console.log(res)
        sessionStorage.setItem("Library-Token",res.token)
        sessionStorage.setItem("Library-Name",res.user.name)
        sessionStorage.setItem("Library-email",res.user.email)
        
        window.location.href="/home";
    }
});

}