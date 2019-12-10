const diifInDates=require('./diffInDates')
function calculateCharge(dateOfIssue, datePresent, noOfDays,chargePerDay,FinePerDay){
    //dateOfReturn->day user returned book ,dateOfIssue->date user issued the book,noOfDays->days for which user was allowed to keep a book
    //chargePerDay->charge leived on the user per day, fineperDay->fine leived on user every day after past returnDate
    var milliDateOfIssue=dateOfIssue.getTime()
    var milliDateOfReturn=(dateOfIssue.getTime()+noOfDays*24*60*60*1000)
    var milliDatePresent=datePresent.getTime()
    var daysBorrowed=diifInDates(dateOfIssue,datePresent)
    // if returned before dateofReturn  // wont have fine
    if(milliDateOfReturn>milliDatePresent){
        
        return ({charge:100});

    }
    //if returned after dateofreturn //will have fine
    else{
        return ({charge:100,fine:50});

    }

}