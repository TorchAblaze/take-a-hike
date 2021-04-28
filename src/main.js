import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js';
import WeatherService from './js/weather-api';

function getElements(response) {
  let parkListHTML = ``;
  if (response.data) {
    response.data.forEach((element, index) => {
      parkListHTML += (`<li id="${index}">${element.fullName}</li>`);
    });
    $(".output").html(parkListHTML);
  } else {
    $(".output").text("Oops, sorry, we didnt find anything. Please try again.");
  }
}


function getWeatherElements(response) {
  if (response.main) {
    $("#current-temp").text(response.main.temp);
    $("#weather-description").text(response.weather[0].description);
    $("#high-temp").text(response.main.temp_max);
    $("#low-temp").text(response.main.temp_min);
    $("#wind-speed").text(response.wind.speed);
    // $("#rain-total").text(response.rain[3h]);
    // $("#snow-total").text(response.snow.snow[3h]);
  } else {
    $("#show-weather").text(response);
  }
}

$(document).ready(function () {
  $("#main-page").submit(function (event) {
    event.preventDefault();

    const selectedState = $("#state-select").val();

    NpsMainService.getPark(selectedState)
      .then(function (response) {
        getElements(response);
        let pleaseWork = response.data;
        console.log(pleaseWork);

        $("li").click(function () {
          const parkZip = response.data[this.id].addresses[0].postalCode;
          const formattedZip = parkZip.slice(0, 5);
          WeatherService.getWeather(formattedZip)
            .then(function (response) {
              getWeatherElements(response);
            });
        });
      });
  });
});