// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete

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
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace()
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
  // alert(addVal)
  if (addVal.length > 0) {
    $('#Chatform').append(
      $('<p>')
        .text('Address: ' + addVal)
        .attr('class', 'chat-bubble-right')
    )
    $('#autocomplete').val('')
  }

  var bolVal = $('#billOfLading').val()
  // alert(bolVal)
  if (bolVal.length > 0) {
    $('#Chatform').append(
      $('<p>')
        .text('Bill of Lading: ' + bolVal)
        .attr('class', 'chat-bubble-right')
    )
    $('#billOfLading').val('')
  }

  var sealVal = $('#sealNumber').val()
  // alert(sealVal.len)
  if (sealVal.length > 0) {
    $('#Chatform').append(
      $('<p>')
        .text('Seal Number: ' + sealVal)
        .attr('class', 'chat-bubble-right')
    )
    $('#sealNumber').val('')
  }

  event.preventDefault()
})

$('#send').on('click', function() {
  var msgVal = $('#chatMsg').val()
  $('#Chatform').append(
    $('<p>')
      .text(msgVal)
      .attr('class', 'chat-bubble-right')
  )
  $('#chatMsg').val('')
})

//firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBbmjc0FlMjD0oox0Bwxr2GjaCtVroEW2g',
  authDomain: 'project-v-42a48.firebaseapp.com',
  databaseURL: 'https://project-v-42a48.firebaseio.com',
  projectId: 'project-v-42a48',
  storageBucket: '',
  messagingSenderId: '581821832445',
  appId: '1:581821832445:web:6e09da7243c5a6ad'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Create a variable to reference the database.
var database = firebase.database()

database.ref('msg').on(
  'child_added',
  function(snapshot, prevChildKey) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val()

    console.log(sv)

    // Handle the errors
  },
  function(errorObject) {
    console.log('Errors handled: ' + errorObject.code)
  }
)

database.ref('msg').push({
  name: 'leo',
  comment: 'hey',
  dateAdded: firebase.database.ServerValue.TIMESTAMP
})

database.ref('msg').push({
  name: 'rick',
  comment: 'yo',
  dateAdded: firebase.database.ServerValue.TIMESTAMP
})

database.ref('msg').push({
  name: 'leo',
  comment: 'i love popsicles',
  dateAdded: firebase.database.ServerValue.TIMESTAMP
})

database.ref('msg').push({
  name: 'rick',
  comment: 'bro go away',
  dateAdded: firebase.database.ServerValue.TIMESTAMP
})
