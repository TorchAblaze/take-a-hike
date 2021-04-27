import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js';
import WeatherService from './js/weather-api';

// const names = ["Jesse", "Marney", "Isaac", "Tiffany"]

function getElements(response) {
  let parkListHTML = ``;
  if (response.data) {
    response.data.forEach((element) => {
      parkListHTML += (`<li>${element.fullName}</li>`);
    });
    $(".output").html(parkListHTML);
  } else {
    $(".output").text("that hit the else statement");
    console.log(response);// we can see this! YAY! :D
  }
}

function chainElements(response) {
  const parkZip = response.data.addresses.postalCode;
  if (parkZip) {
    return parkZip;
  } else {
    console.log(response)
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
    const parkCode = "97229"

    NpsMainService.getPark(selectedState)
      .then(function (response) {
        getElements(response);
        chainElements(response);
        let pleaseWork = response.data;
        console.log(pleaseWork);
      });

    WeatherService.getWeather(parkCode)
      .then(function (response) {
        getWeatherElements(response);
      })

  });
});