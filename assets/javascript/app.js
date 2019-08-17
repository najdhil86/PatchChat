// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var appUserID, allAppUsers
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

  // for (var component in componentForm) {
  //   document.getElementById(component).value = ''
  //   document.getElementById(component).disabled = false
  // }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // for (var i = 0; i < place.address_components.length; i++) {
  //   var addressType = place.address_components[i].types[0]
  //   if (componentForm[addressType]) {
  //     var val = place.address_components[i][componentForm[addressType]]
  //     document.getElementById(addressType).value = val
  //   }
  // }
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
$('#sendFormInfo').on('click', function() {
  var addVal = 'Address: ' + $('#autocomplete').val()
  // alert(addVal)
  if ($('#autocomplete').val().length > 0) {
    $('#Chatform').append(
      $('<p>')
        .text(addVal)
        .attr('class', 'chat-bubble-right')
    )
    $('#autocomplete').val('')
    appUserID = $('#sendUserID').text()
    writeToDB(appUserID, addVal)
  }

  var bolVal = 'Bill of Lading: ' + $('#billOfLading').val()
  // alert(bolVal)
  if ($('#billOfLading').val().length > 0) {
    $('#Chatform').append(
      $('<p>')
        .text(bolVal)
        .attr('class', 'chat-bubble-right')
    )
    $('#billOfLading').val('')
    appUserID = $('#sendUserID').text()
    writeToDB(appUserID, bolVal)
  }

  var sealVal = 'Seal Number: ' + $('#sealNumber').val()
  // alert(sealVal.len)
  if ($('#sealNumber').val().length > 0) {
    $('#Chatform').append(
      $('<p>')
        .text(sealVal)
        .attr('class', 'chat-bubble-right')
    )
    $('#sealNumber').val('')
    appUserID = $('#sendUserID').text()
    writeToDB(appUserID, sealVal)
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
  appUserID = $('#sendUserID').text()
  writeToDB(appUserID, msgVal)
})

// Your web app's Firebase configuration
var config = {
  apiKey: 'AIzaSyBbmjc0FlMjD0oox0Bwxr2GjaCtVroEW2g',
  authDomain: 'project-v-42a48.firebaseapp.com',
  databaseURL: 'https://project-v-42a48.firebaseio.com',
  projectId: 'project-v-42a48',
  storageBucket: '',
  messagingSenderId: '581821832445',
  appId: '1:581821832445:web:6e09da7243c5a6ad'
}
// Initialize Firebase
firebase.initializeApp(config)

// Create a variable to reference the database.
var database = firebase.database()

var appUserID = $('#sendUserID').text()
function writeToDB(userID, commentVal) {
  database.ref('msg').push({
    name: userID,
    comment: commentVal,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
}

// Firebase watcher .on("child_added"
database.ref('msg').on(
  'child_added',
  function(snapshot, prevChildKey) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val()
    // debugger
    console.log(sv)
    if (sv.name == $('#receiveUserID').text()) {
      $('#Chatform').append(
        $('<p>')
          .text(sv.comment)
          .attr('class', 'chat-bubble-left')
      )
    }

    // Handle the errors
  },
  function(errorObject) {
    console.log('Errors handled: ' + errorObject.code)
  }
)

var appUserRole
var appUserName
var appUserPass

$('.udriver').on('click', function() {
  appUserRole = $('.udriver').text()
})

$('.udispatcher').on('click', function() {
  appUserRole = $('.udispatcher').text()
})

$('.signupbtn').on('click', function() {
  if (appUserRole == 'Dispatcher') {
    appUserName = $('.nkey').val()
    appUserPass = $('.pkey').val()
  } else {
    appUserName = $('#dName').val()
    appUserPass = $('#dPwd').val()
  }
  alert(appUserName)
  alert(appUserPass)
  database.ref('users').push({
    name: appUserName,
    password: appUserPass,
    userrole: appUserRole,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
  // event.preventDefault()
})

allAppUsers = []
// Firebase watcher .on("child_added"
database.ref('users').on(
  'value',
  function(snapshot, prevChildKey) {
    // storing the snapshot.val() in a variable for convenience
    var sVal = snapshot.val()
    $('#dispatcherList').empty()
    $('#driverList').empty()
    for (var elm in sVal) {
      var el = elm
      var myVal = sVal[el].name
      allAppUsers.push(myVal)
      var aTag = $('<a>').text(myVal)
      var aTagWithClass = aTag.addClass('list-group-item')
      var aTagClassStyle = aTagWithClass.attr('style', 'text-align: center')
      var aTagClassStyleHref = aTagClassStyle.attr('href', 'index.html')
      var a = aTagClassStyleHref.attr('data-user', myVal)
      // debugger
      if (sVal[el].userrole == 'Dispatcher') {
        $('#dispatcherList').append(aTagClassStyleHref)
      } else {
        $('#driverList').append(aTagClassStyleHref)
      }
    }

    // Handle the errors
  },
  function(errorObject) {
    console.log('Errors handled: ' + errorObject.code)
  }
)
//////*****
//////*****
//////*****
//////*****
allAppUsers = []
// Firebase watcher .on("child_added"
database.ref('users').on(
  'value',
  function(snapshot, prevChildKey) {
    // storing the snapshot.val() in a variable for convenience
    var sVal = snapshot.val()
    $('#dispatcherList').empty()
    $('#driverList').empty()
    for (var elm in sVal) {
      var el = elm
      var myVal = sVal[el].name
      allAppUsers.push(myVal)
      var optionTag = $('<option>').text(myVal)
      var oTag = optionTag.attr('value', myVal)
      // debugger
      if (sVal[el].userrole == 'Dispatcher') {
        $('#dropDownDispatcher').append(oTag)
      } else {
        $('#dropDownDriver').append(oTag)
      }
    }

    // Handle the errors
  },
  function(errorObject) {
    console.log('Errors handled: ' + errorObject.code)
  }
)

// $('select[="dropDownDriver"]').change(function(){

//   if ($(this).val() == "2"){
//       alert("call the do something function on option 2");
//    }
// });​
$('#dropDownDriver').change(function() {
  $('#receiveUserID').empty()
  var ddVal = $(this).val()
  $('#receiveUserID').text(ddVal)
})

$('#dropDownDispatcher').change(function() {
  $('#sendUserID').empty()
  var ddDispVal = $(this).val()
  $('#sendUserID').text(ddDispVal)
})
// function getActiverUser() {
//   var retVal = ''
//   database.ref('activeUsr').on(
//     'value',
//     function(snapshot) {
//       // storing the snapshot.val() in a variable for convenience
//       var snpVal = snapshot.val()
//       retVal = snpVal.name
//       $('#receiveUserID').text(retVal)
//       // debugger

//       // alert()

//       // Handle the errors
//     },
//     function(errorObject) {
//       console.log('Errors handled: ' + errorObject.code)
//     }
//   )
//   return retVal
// }
// getActiverUser()

// $('#receiveUserID').text(curUser)
// debugger
