import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js';

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


$(document).ready(function () {
  $("#main-page").submit(function (event) {
    event.preventDefault();

    const selectedState = $("#state-select").val();

    NpsMainService.getPark(selectedState)
      .then(function (response) {
        getElements(response);
        // getElements(response);
        let pleaseWork = response.data;
        console.log(pleaseWork);
        // pleaseWork.forEach((element) => {
        //   console.log(element.fullName); 
      });

  });
});