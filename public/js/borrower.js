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
function xhttpRequest1(type,request,url,callback){
    const xhttp=new XMLHttpRequest();
    xhttp.open(type,host+url,true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(request));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            callback((xhttp.responseText));
        }

}}


function lending(){
xhttpRequest('GET',{},'getBorrowingHistory/'+sessionStorage.getItem('Library-email'),(res)=>{
    console.log(res)
    for(let i=0;i<res.length;i++){
        document.getElementById('point'+(i+1)).style="visibility:visible"
        document.getElementById('point'+(i+1)+'title').innerText=res[i].title
        document.getElementById('point'+(i+1)+'status').innerText=res[i].status
            if(res[i].status=="Returned"){
            document.getElementById('point'+(i+1)+'href').innerText="Details";
        }
        else{
            document.getElementById('point'+(i+1)+'href').innerText="Return";
            

            document.getElementById('point'+(i+1)+'href').addEventListener('click', function(){
                ret(res[i].lendBy,res[i].title,i)
            });
            
        
        }
    }

})
}
function ret(lendBy,title,i){
    xhttpRequest1('POST',{lendBy,title,token:sessionStorage.getItem("Library-Token")},'reqReturn',(res)=>{
        if(res=="return request sent"){
            alert("Return Request sent succesfully")
            submitReview(lendBy,title,i)
            //addEventListener('click', function(){
            //     submitReview(lendBy,title,i)
            // });
        }
    })
    

}
function submitReview(lendBy,title,i){
    sessionStorage.setItem('Library-lendby',lendBy)
    sessionStorage.setItem('Library-title',title)
    window.location.href="/submitReviewPage"
}
window.onload=lending()