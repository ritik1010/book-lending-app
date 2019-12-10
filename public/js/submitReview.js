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
function submitReview(){
    alert("sending Review")
    const lendBy=sessionStorage.getItem('Library-lendby')
    const rating=document.getElementById('bookRating').value
    const title=sessionStorage.getItem('Library-booktitle')
    xhttpRequest('POST',{token:sessionStorage.getItem('Library-token'),title:sessionStorage.getItem('Library-title'),lendBy:sessionStorage.getItem('Library-lendby')},'subReview',(res)=>{
        console.log(res)
    });
    alert("2")
    window.location.href="/borrowingHistory"
}
function setReview(){

    const lendBy=sessionStorage.getItem('Library-lendby')
     
    const title=sessionStorage.getItem('Library-title')
    
    
    document.getElementById('bookTitle').value=title
    document.getElementById('bookLendBy').value=lendBy

    
}
document.addEventListener('DOMContentLoaded', function() {
    setReview()// your code here
 }, false);

