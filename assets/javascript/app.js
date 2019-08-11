// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete
var mykey = config.MY_KEY
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    { types: ['geocode'] }
  )

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component'])

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress)
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      })
      autocomplete.setBounds(circle.getBounds())
    })
  }
}

//placing data from address form section into chat
$('button').on('click', function() {
  var addVal = $('#autocomplete').val()
  if (addVal.len > 0) {
    $('#Chatform').append($('<p>').text('Address: ' + addVal))
    $('#autocomplete').val('')
  }

  var bolVal = $('#billOfLading').val()
  if (bolVal.len > 0) {
    $('#Chatform').append($('<p>').text('Bill of Lading: ' + bolVal))
    $('#billOfLading').val('')
  }

  var sealVal = $('#sealNumber').val()
  if (sealVal.len > 0) {
    $('#Chatform').append($('<p>').text('Seal Number: ' + sealVal))
    $('#sealNumber').val('')
  }

  event.preventDefault()
})
