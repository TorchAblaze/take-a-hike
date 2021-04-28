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
    response.data.forEach((element, index) => {
      parkListHTML += (`<li id="${index}">${element.fullName}</li>`); //what if we pull the zip code out as well when we are pullin out the names of the parks.
    });
    $(".output").html(parkListHTML);
  } else {
    $(".output").text("that hit the else statement");
    console.log(response);// we can see this! YAY! :D
  }
}

//that would then get rid of the need for this function.
// function chainElements(response) {
//   const parkZip = response.data[0].addresses[0].postalCode;
//   if (parkZip) {
//     return parkZip;
//   } else {
//     console.log("That did not work fool");
//   }
// }

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
          // chainElements(response);
          const parkZip = response.data[this.id].addresses[0].postalCode;
          // console.log(chainElements(response));
          WeatherService.getWeather(parkZip)//here we would reference the response.postalCode instead of parkZip.
            .then(function (response) {
              getWeatherElements(response);//this would stay the same.
            });
        });
      });
  });
});

// // "$ = JQuery; interchangable"
// $(function() { // updated syntax: (document).ready
//   $(".clickable.section1").on("click", function() {
//     $("#content1").slideToggle()
//     $("#hide1").fadeToggle()
//     $("#show1").slideToggle()