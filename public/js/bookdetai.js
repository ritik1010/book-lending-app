const host="http://192.168.137.1:3000/"
function xhttpRequest(type,request,url,callback){
    const xhttp=new XMLHttpRequest();
    xhttp.open(type,host+url,true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(request));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            callback(xhttp.responseText);
        }

}}
const bookid="{{lbId}}"
function getBookDetail(){
    alert(bookid)
}
window.onload=getBookDetail()