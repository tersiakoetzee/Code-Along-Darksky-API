window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span")

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywere.herokuapp.com/";
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=845e252f5e9aa25672c3ccf2ba2e7cc0`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          let [{ description, icon }] = data.weather;
          const { timezone } = data;
          console.log(timezone);
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = timezone;

          let celsius = (temp - 32) * (5 / 9);

          setIcons(icon, document.querySelector('icon'));


          temperatureSection.addEventListener("click", () =>{
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C" ;
              temperatureDegree.textContent = Math.floor(celsius) 
            }else{
               temperatureSpan.textContent = "F"; 
               temperatureDegree.textContent = temp;
            }
          })
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }
});

// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=845e252f5e9aa25672c3ccf2ba2e7cc0;
