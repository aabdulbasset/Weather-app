

/* Global Variables */
const apiKey = 'ca797e291cf85542b021e186c52eef9e&units=imperial';
const localhost = "http://localhost:3000"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'-'+ d.getDate()+'-'+ d.getFullYear();
let feeling
let zipCode
document.getElementById("generate").addEventListener("click",()=>{
    zipCode = document.querySelector(".zip-input").value
    feeling = document.querySelector(".feeling-input").value
    zipCode == "" || feeling == "" ? alert("Please fill all the fields"):generateData(zipCode).then(data=>{postData(data)})

})
document.getElementById("weather-form").addEventListener("submit",(e)=>{e.preventDefault()})
async function generateData (zipCode){
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`)
    const result = await data.json()
    if (result.cod == "404"){
        alert("Invalid city zip code")
    }else if(result.cod == "200"){
        return result.main.temp
    }
    
}

async function postData(temp){
    let dataToPost = {
        temp: temp,
        feeling: feeling,
        date: newDate,
    }
    const response = await fetch(localhost+"/postData",(dataToPost)={
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(dataToPost),
    }).then(
        updateUI()
    )
    
}

async function updateUI(){
    const fetchInfo = await fetch(localhost+"/getData")
    await fetchInfo.json().then((returnedData)=>{
        document.querySelector(".date").innerHTML = returnedData.date
        document.querySelector(".feeling").innerHTML = returnedData.feeling
        document.querySelector(".temperature").innerHTML = returnedData.temp
    })


}