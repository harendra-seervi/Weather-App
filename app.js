const errorMsg = document.querySelector(".error").style.display="none";

imageUrl = `https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}/?weather`;
fetch(imageUrl)
    .then((response)=>response.blob())
    .then((blob)=>{
       const objectUrl = URL.createObjectURL(blob)
       document.querySelector(".b-img").src = objectUrl;
       document.querySelector(".card").style.display="block";
       document.querySelector(".loading").style.display="none";
       document.querySelector(".main-content").style.display="flex";
    }
)
const weather={
    apiKey:"6716e1642f6491f47091b18087b923c4",
    fetchWeather: function(city){
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6716e1642f6491f47091b18087b923c4`;
        fetch(url).then((response=>{
            if(response.ok){
                return response.json();
            }
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
            throw new Error("Check your connection");
        }))
        .then((data)=>{
            this.displayWeather(data);
            console.log(data);
        })
    },
    displayWeather: function(data){
        const {speed} = data.wind;
        const city= data.name;
        const {humidity} = data.main;
        const icon= data.weather[0].icon;
        const description = data.weather[0].description;
        let temperature =Number(data.main.temp);
        temperature=Math.ceil(temperature-273.15);
        console.log(temperature);
        document.querySelector(".city").textContent = `Weather in ${city}`;
        document.querySelector(".temp").textContent = `${temperature}°C`;
        document.querySelector(".cloud-icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".discription").textContent=`${description}`;
        document.querySelector(".humadity").textContent = `Humidity : ${humidity}%`;
        document.querySelector(".wind-speed").textContent = `Wind (km/h) : ${speed}`;
        document.querySelector(".weather").style.display = "block";
    }
}

const showResult = (text)=>{
    const b =  `https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}/?${text}`;
    document.querySelector(".b-img").src=b;
    weather.fetchWeather(text);
}
document.querySelector(".btnn").addEventListener("click",()=>{
    const errorMsg = document.querySelector(".error").style.display="none";
    const text = document.querySelector(".search-bar").value;
    if(text!=""){
        showResult(text);
    }
})
document.querySelector(".search-bar").addEventListener("keyup",(event)=>{
    if(event.key=="Enter"){
        const errorMsg = document.querySelector(".error").style.display="none";
        const text = document.querySelector(".search-bar").value;
        if(text!=""){
            showResult(text);
        }
    }
})
