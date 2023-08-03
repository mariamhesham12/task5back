let form = document.getElementById('form1')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
   
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const latF = document.getElementById('lat')
const lonF = document.getElementById('lon')
const forecastF = document.getElementById('forecast')

let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/hello?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
            latF.innerText=""
            lonF.innerText=""
        }
        else {
            setTimeout(()=>{
                locationF.innerText = data.location
            },500)
               
            setTimeout(()=>{
                latF.innerText=data.lat
            },1000)

            setTimeout(()=>{
                lonF.innerText=data.lon
            },1500)
            setTimeout(()=>{
                forecastF.innerText = data.forecast
            },2000)

            
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}
