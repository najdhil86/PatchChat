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

var database = firebase.database()

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
  appUserName = $('.nkey').val()
  appUserPass = $('.pkey').val()
  alert(appUserPass)
  database.ref('users').push({
    name: appUserName,
    password: appUserPass,
    userrole: appUserRole,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
})

// Get the dispatcher screen
var dispatcher = document.getElementById('id01')

// When the user clicks anywhere outside of the dispatcher screen, close it
window.onclick = function(event) {
  if (event.target == dispatcher) {
    dispatcher.style.display = 'none'
  }
}

var driver = document.getElementById('id02')

// When the user clicks anywhere outside of the driver screen, close it
window.onclick = function(event) {
  if (event.target == driver) {
    driver.style.display = 'none'
  }
}
