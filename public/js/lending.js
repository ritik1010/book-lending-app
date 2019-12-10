const host="http://192.168.137.1:3000/"
function xhttpRequest(type,request,url,callback){
    const xhttp=new XMLHttpRequest();
    xhttp.open(type,host+url,true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(request));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            callback(JSON.parse(xhttp.responseText));
        }

}}
function lending(){
xhttpRequest('GET',{},'getLendingHistory/'+sessionStorage.getItem('Library-email'),(res)=>{
    console.log(res)
    for(let i=0;i<res.length;i++){
        document.getElementById('point'+(i+1)).style="visibility:visible"
        document.getElementById('point'+(i+1)+'title').innerText=res[i].title
        document.getElementById('point'+(i+1)+'status').innerText=res[i].status
        document.getElementById('pont'+(i+1)+'doi').innerText=res[i].dateOfIssue;
    }

})
}
window.onload=lending()