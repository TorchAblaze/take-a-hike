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
  const description = response.weather[0].description;
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  if (response.main) {
    $("#current-temp").text(`Current Temp: ${response.main.temp} ℉`);

    $("#weather-description").text(`Weather Overview: ${description.capitalize()}`);
    $("#high-temp").text(`High: ${response.main.temp_max} ℉`);

    $("#low-temp").text(`Low: ${response.main.temp_min} ℉`);
    $("#wind-speed").text(`Wind Speed: ${response.wind.speed} mph`);
    if (response.rain) {
      $("#rain-total").text(`${response.rain["1h"]} inches have been recorded in the last hour.`);
    } else {
      $("#rain-total").text(`There has been no measurable rainfall for the past hour`);
    }
    if (response.snow) {
      $("#snow-total").text(`${response.snow["1h"]} inches have been recorded in the last hour.`);
    } else {
      $("#snow-total").text(`There has been no measurable snowfall for the past hour`);
    }
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