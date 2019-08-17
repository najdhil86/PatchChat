var config = {
  apiKey: 'AIzaSyDkxDLf_cvFXX5ymtkqTVYmZ_Pdppgm9Sg',
  authDomain: 'project-ad067.firebaseapp.com',
  databaseURL: 'https://project-ad067.firebaseio.com',
  projectId: 'project-ad067',
  storageBucket: '',
  messagingSenderId: '122757818910',
  appId: '1:122757818910:web:a27c76ae762f896d'
}
// Initialize Firebase
firebase.initializeApp(config)

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
