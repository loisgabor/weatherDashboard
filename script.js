$(document).ready(function () {
  $(".btn").on("click", function (event) {
    event.preventDefault();

    var citySearch = $("#inputCity").val();
    getCity(citySearch);
  });
  var now = moment().format("(M/D/YYYY)");
  function getCity(citySearch) {
    var APIKey = "0cf9e00acc3e517c41f78060d290e7fe";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch +
      "&appid=" +
      APIKey +
      "&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $(".city").text(response.name + now);
      $(".wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").text("Temperature: " + response.main.temp + " ℉");
      localStorage.setItem("cities", citySearch);
      var lat = response.coord.lat;
      var long = response.coord.lon;

      getUVIndex(lat, long);

      function getUVIndex(lat, long) {
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${long}`,
          method: "GET",
        }).then(function (response) {
          var uvIndex = response.value;
          var condition = "btn-danger";
          if (uvIndex < 3) {
            condition = "btn-success";
          } else if (uvIndex < 7) {
            condition = "btn-warning";
          }

          $(".uv-index").text("UV-Index: " + uvIndex);
          $(".uv-index").attr("class", `btn ${condition}`);
        });
      }
    });
  }
});