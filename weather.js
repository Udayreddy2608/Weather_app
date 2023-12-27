let key="e8f0dcd41da70d4f952b5e7c6a5f923e";
console.log(key)


const changeSun=(condition)=>{
    let image=document.getElementById("condimg");
    if (condition==="mist" || condition==="haze"){
        image.src="haze.png";
    }else if(condition==="smoke"){
        image.src="thunderstorm.png";
    }else if(condition==="clear sky"){
        image.src="clearsky.png";
    }else if(condition.includes("clouds")){
        image.src="cloudy.png";
    }else if(condition.includes("moderate")){
        image.src="slightrain.png";
    }else if(condition.includes("rain")){
        image.src="heavyrain.png";
    }
}



const chageHot=(condition)=>{
    let image=document.getElementById("nothing");
    if (condition<0){
        image.src="snowflake.png";
        image.style.display="block";
    }else if (condition>35){
        image.src="hot.png";
        image.style.display="block";
    }else{
        image.style.display="none";
    }
}

const minMaxTemp=(t1,t2)=>{
    let line=document.getElementById("maxtemp");
    line.innerText=`Max-Temp: ${t1+String.fromCharCode(176)+"C"} , Min-Temp: ${t2+String.fromCharCode(176)+"C"}`
}

const windSpeed=(speed)=>{
    let wSpeed=document.getElementById("windspeedval");
    wSpeed.textContent=speed;
}


const riseSet=(t1,t2)=>{
    let sunRise=document.getElementById("sunrise");
    let sunSet=document.getElementById("sunset");
    let date = new Date(t1 * 1000);
    let date1 = new Date(t2 * 1000);
    let time1=date.getHours();
    let time2=date1.getHours();
    sunRise.innerText= `Sunrise: ${time1}:00 hrs`
    sunSet.innerHTML=`Sunset: ${time2}:00 hrs`
}




 async function getData(){
    let city=document.querySelector("input").value;
    let country=document.getElementById("country");
    let cityName=document.getElementById("city");
    let temperature=document.getElementById("tempval");
    let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    let data= await response.json();
    let lonlat=document.getElementById("lon");
    let suncond=document.getElementById("suncond");
    let pressure=document.getElementById("pressure")
    

    cityName.innerText=city.toUpperCase();
    country.innerText=data.sys.country;
    temperature.innerText=data.main.temp+String.fromCharCode(176);
    lonlat.innerText= `lon: ${data.coord.lon}, lat: ${data.coord.lat}`;
    suncond.innerText=data.weather[0].description;
    pressure.innerText="Pressure: "+data.main.pressure;
    changeSun(data.weather[0].description);
    chageHot(data.main.temp);
    minMaxTemp(data.main.temp_max,data.main.temp_min);
    windSpeed(data.wind.speed);
    riseSet(data.sys.sunrise,data.sys.sunset);
}







