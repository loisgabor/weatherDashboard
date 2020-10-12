$(document).ready(function () {
  var APIKey = "422ae7347fb69a34e15fd81291e2139c";
  var queryURL =
    "api.openweathermap.org/data/2.5/forecast?id={city ID}&appid=" + APIKey;
  $(".btn").on("click", function (event) {
    event.preventDefault();
  });
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
