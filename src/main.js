import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js'; 

function getStateParks(response) {
  let parkListHTML = ``;
  if (response.data) {
    response.data.forEach((element) => {
      parkListHTML += (`<li><button id=${element.parkCode}>${element.fullName}</button></li>`);
    });
    $(".output").html(parkListHTML);
  } else {
    $(".output").text("that hit the else statement");
  }
}
function parksInfo(response) {
  $(`${response.data.parkCode}`).click(function(){
    $(".parkInfoOutput").html();
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