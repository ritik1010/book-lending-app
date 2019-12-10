
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

}

}
function xhttpRequest1(type,request,url,callback){
    const xhttp=new XMLHttpRequest();
    xhttp.open(type,host+url,true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(request));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            callback((xhttp.responseText));
        }

}

}
function notification(){
    xhttpRequest('POST',{token:sessionStorage.getItem('Library-Token')},'getAllNotifications',(res)=>{
        console.log(res)
        for(let i=0;i<res.length;i++){
            document.getElementById('notification'+(i+1)).style="visibility:visible"
            document.getElementById('notification'+(i+1)+'body').innerText=res[i].message
            
            if (res[i].message.includes('pay')){
                document.getElementById('notification'+(i+1)+'can').style="display:none";
                
                // document.getElementById('notification'+(i+1)+'ok').onclick=seenNotification(res[i]._id)
                document.getElementById('notification'+(i+1)+'ok').addEventListener('click', function(){
                    seenNotification(res[i]._id)
                });
                
                document.getElementById('notification'+(i+1)+'ok').innerText="Pay"
            

            }
            else if(res[i].message.includes('Congrats!')){
                document.getElementById('notification'+(i+1)+'ok').innerText="Navigate to lender"
                document.getElementById('notification'+(i+1)+'ok').addEventListener('click', function(){
                    seenNotification(res[i]._id)
                    
                });
                document.getElementById('notification'+(i+1)+'can').style="display:none";
            }
            else if(res[i].message.includes('requested to lend')){
                document.getElementById('notification'+(i+1)+'ok').innerText="Accept"
                document.getElementById('notification'+(i+1)+'can').innerText="Reject";

                // document.getElementById('notification'+(i+1)+'ok').onclick=acceptBorrowRequestNotification(res[i]._id,"true")
                // document.getElementById('notification'+(i+1)+'can').onclick=acceptBorrowRequestNotification(res[i]._id,"false")
                document.getElementById('notification'+(i+1)+'ok').addEventListener('click', function(){
                    acceptBorrowRequestNotification(res[i]._id,"true")

                });
                document.getElementById('notification'+(i+1)+'can').addEventListener('click', function(){
                    acceptBorrowRequestNotification(res[i]._id,"false")
                    
                });
                
            }
            else if(res[i].message.includes('request has been rejected')){
                
                document.getElementById('notification'+(i+1)+'ok').innerText="Seen"
                document.getElementById('notification'+(i+1)+'ok').addEventListener('click', function(){
                    seenNotification(res[i]._id)
                });
                document.getElementById('notification'+(i+1)+'can').style="display:none";
                
            }
            else{
                document.getElementById('notification'+(i+1)+'ok').innerText="Accept Return"
                
                document.getElementById('notification'+(i+1)+'ok').addEventListener('click', function(){
                    acceptReturnRequestNotification(res[i]._id)
                });

                
            }

        }
    
    })
}
function seenNotification(notificationId){
    alert('notification Seen called')
    xhttpRequest1('POST',{notificationId},'notificationSeen',(resp)=>{
        console.log("done")
        alert("done")
        location.reload()
    })
}
function acceptBorrowRequestNotification(notificationId,accepted){
    xhttpRequest1('POST',{accepted,token:sessionStorage.getItem('Library-Token'),notificationId},'acceptBorrow',(resp)=>{
        if(resp=="borrowed"){
            alert("Borrow request accepted succefully")
            location.reload()
        }
        else{
            alert("not success")
            location.reload()
        }
        
    })

}
function acceptReturnRequestNotification(notificationId){
    alert("here")
    xhttpRequest1('POST',{token:sessionStorage.getItem('Library-Token'),notificationId},'acceptReturnRequest',(resp)=>{
        if(resp=="Return compelete"){
            alert("Return  request accepted succefully")
            location.reload()
        }
        else{
            alert("not success")
            location.reload()
        }
        
    })
}
window.onload=notification()