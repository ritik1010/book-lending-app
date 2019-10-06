
const search=document.querySelector('input')
const form=document.querySelector('form')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


form.addEventListener('submit',(e)=>{
    messageOne.textContent="Loading....."
    e.preventDefault()
    const location =search.value
    fetch("http://localhost:3000/weather?address="+location).then((response) =>{
response.json().then((data)=>{
    messageOne.textContent=data.location+ " temprature is "+data.temp+"FmessageOne.textContent=";
})
})
    

})