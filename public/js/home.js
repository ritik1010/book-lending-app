const host="http://192.168.137.1:3000"
function xhttpRequest(type,request,url,callback){
    const xhttp=new XMLHttpRequest();
    xhttp.open(type,host+url,true)
    xhttp.setRequestHeader("Content-type","application/json")
    console.log(request)
    xhttp.send(JSON.stringify(request));
    
    
        xhttp.onreadystatechange=(e)=>{
            
            if (xhttp.readyState == 4 && xhttp.status == 200){
            callback(JSON.parse(xhttp.responseText));
        }

}}
function homeLoad(){
   
const token=sessionStorage.getItem('Library-Token')
xhttpRequest('POST',{token},'/getNearbyBooks',(res)=>{
    for(var i=0;i<res.length;i++){
        console.log(res[i])
        document.getElementById('book'+(i+1)).style="visibiliy:visible"
        document.getElementById('book'+(i+1)+"link").href="/lendingBookDetails/"+res[i].lb._id
        document.getElementById('book'+(i+1)+"title").innerText=res[i].book.title
        document.getElementById('book'+(i+1)+'rating').innerText="Rating: "+res[i].lb.rating
        // console.log(host+"/bookImage/"+res[i].book.title.replace(/ /g,"_")+"/"+res[i].book.author.replace(/ /g,"_"))
        document.getElementById('book'+(i+1)+"img").src=host+"/bookImage/"+res[i].book.title.replace(/ /g,"_")+"/"+res[i].book.author.replace(/ /g,"_");
        
        // "url('https://cdn.business2community.com/wp-content/uploads/2019/05/optimizing-images-for-google-images.png')";
        

    }

})
}
window.onload=homeLoad()
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById("itemName").innerText ="Hello , "+sessionStorage.getItem("Library-Name");

//     // your code here
//  }, false);