$(document).ready(function () {
  $(".btn").on("click", function (event) {
    event.preventDefault();
    var citySearch = $("#inputCity").val();
    var cityButtonEl = $("<button>");

    cityButtonEl.text(citySearch);
    cityButtonEl.attr("id", "button" + citySearch);
    cityButtonEl.attr("class", "btn-light btn-lg btn-block");
    cityButtonEl.on("click", function () {
      var text = this.textContent;
      getCity(text);
    });
    cityButtonEl.attr(
      "style",
      "margin:30px; width:80%; background-color:rgba(38, 109, 241, 0.979"
    );
    $(".card-bodyA").append(cityButtonEl);

    localStorage.setItem("cityName" + citySearch, citySearch);
    getCity(citySearch);
    $(".forecast").show();
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
      localStorage.getItem("cityName", citySearch);

      $("#weather-icon").attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"
      );
      var lat = response.coord.lat;
      var long = response.coord.lon;
      var queryURL =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=" +
        APIKey;

      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        var uvIndex = response.value;
        console.log(response);
        var condition = "btn-danger";
        if (uvIndex < 3) {
          condition = "btn-success";
        } else if (uvIndex < 7) {
          condition = "btn-warning";
        }

        $(".uv-index").text("UV-Index: " + uvIndex);
        $(".uv-index").attr("class", `uv-index btn ${condition} disabled`);
        $(".card1").text();
      });
    });
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      citySearch +
      "&appid=" +
      APIKey +
      "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var dayOneDate = moment().add(1, "days").format("L");
      var tempFone = "Temp: " + response.list[5].main.temp.toFixed(0) + "  ℉";
      var weatherPicOne = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.list[5].weather[0].icon +
          "@2x.png"
      );
      var humidCityOne = "Humidity: " + response.list[5].main.humidity;
      $(".card1")
        .text(dayOneDate, weatherPicOne, tempFone, humidCityOne)
        .append(tempFone, weatherPicOne, humidCityOne);
      var dayTwoDate = moment().add(2, "days").format("L");
      var tempFTwo = "Temp: " + response.list[10].main.temp.toFixed(0) + "  ℉";
      var weatherPicTwo = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.list[10].weather[0].icon +
          "@2x.png"
      );
      var humidCityTwo = "Humidity: " + response.list[10].main.humidity;
      $(".card2")
        .text(dayTwoDate, weatherPicTwo, tempFTwo, humidCityTwo)
        .append(tempFTwo, weatherPicTwo, humidCityTwo);
      var dayThreeDate = moment().add(3, "days").format("L");
      var tempFThree =
        "Temp: " + response.list[16].main.temp.toFixed(0) + "  ℉";
      var weatherPicThree = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.list[16].weather[0].icon +
          "@2x.png"
      );
      var humidCityThree = "Humidity: " + response.list[16].main.humidity;
      $(".card3")
        .text(dayThreeDate, weatherPicThree, tempFThree, humidCityThree)
        .append(tempFThree, weatherPicThree, humidCityThree);
      var dayFourDate = moment().add(4, "days").format("L");
      var tempFfour = "Temp: " + response.list[22].main.temp.toFixed(0) + "  ℉";
      var weatherPicFour = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.list[22].weather[0].icon +
          "@2x.png"
      );
      var humidCityFour = "Humidity: " + response.list[22].main.humidity;
      $(".card4")
        .text(dayFourDate, weatherPicFour, tempFfour, humidCityFour)
        .append(tempFfour, weatherPicFour, humidCityFour);
      var dayFiveDate = moment().add(5, "days").format("L");
      var tempFfive = "Temp: " + response.list[38].main.temp.toFixed(0) + "  ℉";
      var weatherPicFive = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          response.list[38].weather[0].icon +
          "@2x.png"
      );
      var humidCityFive = "Humidity: " + response.list[38].main.humidity;
      $(".card5")
        .text(dayFiveDate, weatherPicFive, tempFfive, humidCityFive)

        .append(tempFfive, weatherPicFive, humidCityFive);
    });
  }
});
