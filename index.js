
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getWeatherData() {
    let searchText = document.getElementById("input-search").value;
    let loaderContainer = document.getElementById("loader-container");
    let resultContainer = document.getElementById("result-container");
    let mainContainer = document.getElementById("main-container");
    mainContainer.style.backgroundImage = "unset"
    resultContainer.style.display = "none";
    loaderContainer.style.display = "flex";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=8255da0d37b321a43c1b0a307d20f609`
    const request = new XMLHttpRequest();
    request.responseType = "json";
    request.open("GET", url, true);
    request.onprogress = () => {
      console.log("LOADING", request.readyState);
    };
  
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            console.log(request.response);
            displayResults(request.response)
        }
    };
    request.send(null);
}

function displayResults(result) {
    const {weather = [], main = {}, name, sys = {}} = result;
    const date = new Date();
    let bodyElement = document.getElementsByTagName("body");
    let mainContainer = document.getElementById("main-container");
    let locationElement = document.getElementById("location-element");
    let dateElement = document.getElementById("date-element");
    let tempElement = document.getElementById("temp-element");
    let resultElement = document.getElementById("temp-result-element");
    let rangeElement = document.getElementById("temp-range-element");

    let loaderContainer = document.getElementById("loader-container");
    let resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "flex";
    loaderContainer.style.display = "none";

    bodyElement[0].style.height = `${window.screen.availHeight - 100}px`;
    mainContainer.style.backgroundImage = `url(assessts/${weather[0]?.main.toLowerCase()}.jpg)`
    locationElement.innerHTML = `${name}, ${sys.country}`;
    dateElement.innerHTML = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    tempElement.innerHTML = `${main.temp.toFixed(1)}&#176;c`;
    resultElement.innerHTML = `${weather[0]?.main}`;
    rangeElement.innerHTML = `${main.temp_min.toFixed(1)}&#176;c / ${main.temp_max.toFixed(1)}&#176;c`;
    
}