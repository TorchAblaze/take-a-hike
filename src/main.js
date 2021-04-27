import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js'; 

function getStateParks(response) {
  let parkListHTML = ``;
  if (response.data) {
    response.data.forEach((object) => {
      parkListHTML += (`<li><button id=${object.parkCode} class="park-names">${object.fullName}</button></li>`);
    });
    $(".output").html(parkListHTML);
  } else {
    $(".output").text("that hit the else statement");
  }
}

function parksInfo(response) {
  $(".park-names").click(function(){
    const clickedPark = this.id;
    console.log(this);
    console.log(response);
    $(".parkInfoOutput").html(clickedPark);
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