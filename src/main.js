import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js'; 

function getStateParks(response) {
  $(".parkInfoOutput").hide();
  let parkListHTML = ``;
  if (response.data) {
    response.data.forEach((object, index) => {
      parkListHTML += (`<p><button id=${index} class="park-names">${object.fullName}</button></p>`);
    });
    $(".park-list").html(parkListHTML);
  } else {
    $(".park-list").text("🍃 Oops! I can't beleaf there was a problem, try again 🍃");
  }
}

function parksInfo(response) {
  $(".park-names").click(function(){
    $(".park-names").hide();
    let parkActivities = ``;
    response.data[clickedPark].activities.forEach((activity) => {
      parkActivities += response.data[clickedPark].activities[activity].name;
    });
    parkDescription = `${response.data[clickedPark].description}`;
    parkAlerts = ``; // different url? 
    parkFees = 

    parkDescription;

    const clickedPark = this.id; 
    const parkName = response.data[clickedPark].fullName;

    console.log(response);
    $(".parkInfoOutput").html(parkName);
    $(".parkInfoOutput").slideDown();
  });
}







$(document).ready(function () {
  $("#main-page").submit(function (event) {
    event.preventDefault();

    const selectedState = $("#state-select").val();

    NpsMainService.getPark(selectedState)
      .then(function (response) {
        getStateParks(response);
        parksInfo(response);
      });

  });
});