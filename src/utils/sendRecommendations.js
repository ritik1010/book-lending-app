const sendMail=require("./sendEmail")
const request=require('request')
function sendRecommendations(name,email,bookName,rating){
    request('http://127.0.0.1:5000/getRecommendations?bookName='+bookName.replace(/ /g,'_')+'&rating='+rating, function (error, response, body) {
        const recommendations=JSON.parse(response.body).recommendations
        var str=" ";
        console.log("here")
        var arrayLength = recommendations.length;
        for (var i = 0; i < arrayLength; i++) {
                str+="->"+recommendations[i].replace(/_/g," ")+" <br/>";
                console.log(str)
             }
        
        sendMail(email,"Recommendations","","<html><h1>Hello! Ritik </h1><br/>"+"<br/><body ><font size='5'>You Submitted feedback for "+bookName+". Recommendations based on your last feedback<br/>Here are the set  of Recommended books for you :<br/> "+str+
        "<br/></font></body></html>")
                                        // Print the HTML for the Google homepage.
      });
      

}
module.exports=sendRecommendations