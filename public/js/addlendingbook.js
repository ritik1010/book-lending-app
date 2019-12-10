
function xhttpRequest(type,request,url,callback){
    const xhttp=new XMLHttpRequest();
    xhttp.open(type,"http://192.168.137.1:3000/"+url,true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(request));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            callback(xhttp.responseText);
        }

}}
function addlendingbook(){
    const req={description:document.getElementById('fbdescription').value,title:document.getElementById('fbtitle').value,
                author:document.getElementById('fbauthor').value, genre:document.getElementById('fbgenre').value,token:sessionStorage.getItem('Library-Token')}
    console.log(req)
    xhttpRequest('POST',req,'addlendingbook',(res)=>{
        console.log(res)
        if(res=='book uploaded for lending'){
            reload()

        }

    })
                
}