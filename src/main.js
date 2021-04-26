import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NpsMainService from './js/nps-main-api.js';

// function getElements(response) {
//   $("#state-select").
// }


$(document).ready(function () {
  $("#main-page").submit(function (event) {
    event.preventDefault();

    const selectedState = $("#state-select").val();
    console.log(selectedState);

    NpsMainService.getPark(selectedState)
      .then(function (response) {
        // getElements(response);
        console.log("NpsMainService working");
        console.log(response.limit);
        response.data.forEach((element) => {
          console.log(element.fullName);
        });
      });
  });
});