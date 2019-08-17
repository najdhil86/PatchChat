function getWeather() {
  // This is our API key. Add your own API key between the ""
  var APIKey = 'f19cfc038c9e277f7badd867acff937c'

  // Here we are building the URL we need to query the database
  var queryURL =
    'https://api.openweathermap.org/data/2.5/weather?zip=94044,us&appid=' +
    APIKey

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response)
    var kel = response.main.temp
    var far = parseInt((kel - 273.15) * (9.0 / 5.0) + 32)
    $('#ourWeather').text(far)
    return far
  })
}

getWeather()
