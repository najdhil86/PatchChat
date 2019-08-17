var sendMsgToUser
$(document).on('click', 'a', function() {
  if ($(this).text() != 'Users') {
    sendMsgToUser = $(this).text()
    database.ref('activeUsr').set({
      name: sendMsgToUser,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    // alert( $('#receiveUserID').text())
    // $('#receiveUserID').text(sendMsgToUser)
  }
})
