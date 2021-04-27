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
    $(".park-list").text("🍃 Oops! I can't beleaf it! That state doesn't exist 🍃");
  }
}

function parksInfo(response) {
  $(".park-names").click(function(){
    $(".park-names").hide();
    const clickedPark = this.id; 
    const parkName = response.data[clickedPark].fullName;
    const parkDescription = `${response.data[clickedPark].description}`;
    const parkFees = `${response.data[clickedPark].entranceFees[0].cost}`;
    let parkActivities = ``;

    response.data[clickedPark].activities.forEach((activity) => {
      parkActivities += `<li>${activity.name}</li>`;
    });

    const parkCode = response.data[clickedPark].parkCode;
    let parkAlerts = ``;
    NpsMainService.getAlert(parkCode)
      .then(function(response) {
        response.data.forEach((alert) => {
          console.log(alert);
          parkAlerts += `<li>${alert.description}</li>`;
        });
      });
    $(".parkInfoOutput").html(`<h2>Park Name: ${parkName}</h2> <br> <h3>Park Info: ${parkDescription}</h3> <br> <h3>Park Alerts:</h3><or>${parkAlerts}</ol> <br> <h3>Park Fee: ${parkFees}</h3> <br> <ul>Park Activities: ${parkActivities}</ul>`);
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