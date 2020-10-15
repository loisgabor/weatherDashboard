$(document).ready(function () {
  //   Adding Event listener
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

  //   Introducing the current weather API
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
      //   Introducing the UV-Index API
      var queryURL =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=" +
        APIKey;

      // Emptying out my 5-day forecast

      $(".card1").empty();
      $(".card2").empty();
      $(".card3").empty();
      $(".card4").empty();
      $(".card5").empty();
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        var uvIndex = response.value;
        console.log(response);
        // Creating the UV-index button
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
    // introducing the 5 day forecast API
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
      // Populating each card for the 5 day forecast
      $(".card1").append(`
        <div class="card">
          <img class="card-img-top" src="http://openweathermap.org/img/wn/${
            response.list[5].weather[0].icon
          }@2x.png">
            <div class="card-body">
            <h5 class="card-title">${moment().add(1, "days").format("L")}</h5>
              <p class="card-text">
              Temp: ${response.list[5].main.temp.toFixed(0)} ℉ <br>
              Humidity: ${response.list[5].main.humidity}
              </p>
            </div>
        </div>
        `);
      $(".card2").append(`
        <div class="card">
          <img class="card-img-top" src="http://openweathermap.org/img/wn/${
            response.list[5].weather[0].icon
          }@2x.png">
            <div class="card-body">
            <h5 class="card-title">${moment().add(2, "days").format("L")}</h5>
              <p class="card-text">
              Temp: ${response.list[10].main.temp.toFixed(0)} ℉ <br>
              Humidity: ${response.list[10].main.humidity}
              </p>
            </div>
        </div>
        `);
      $(".card3").append(`
        <div class="card">
          <img class="card-img-top" src="http://openweathermap.org/img/wn/${
            response.list[16].weather[0].icon
          }@2x.png">
            <div class="card-body">
            <h5 class="card-title">${moment().add(3, "days").format("L")}</h5>
              <p class="card-text">
              Temp: ${response.list[16].main.temp.toFixed(0)} ℉ <br>
              Humidity: ${response.list[16].main.humidity}
              </p>
            </div>
        </div>
        `);
      $(".card4").append(`
        <div class="card">
          <img class="card-img-top" src="http://openweathermap.org/img/wn/${
            response.list[22].weather[0].icon
          }@2x.png">
            <div class="card-body">
            <h5 class="card-title">${moment().add(3, "days").format("L")}</h5>
              <p class="card-text">
              Temp: ${response.list[22].main.temp.toFixed(0)} ℉ <br>
              Humidity: ${response.list[22].main.humidity}
              </p>
            </div>
        </div>
        `);
      $(".card5").append(`
        <div class="card">
          <img class="card-img-top" src="http://openweathermap.org/img/wn/${
            response.list[38].weather[0].icon
          }@2x.png">
            <div class="card-body">
            <h5 class="card-title">${moment().add(3, "days").format("L")}</h5>
              <p class="card-text">
              Temp: ${response.list[38].main.temp.toFixed(0)} ℉ <br>
              Humidity: ${response.list[38].main.humidity}
              </p>
            </div>
        </div>
        `);
    });
  }
});
