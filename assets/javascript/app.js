class SimpleChat
  fireBase = new Firebase("https://simplechatapp.firebaseio.com/")
  
  constructor: ->
    fireBase.on "child_added", (snapshot) =>
      message = snapshot.val()
      @messagesView(message.name, message.text)

    $("#newMessage input").keypress (e) =>
      if(e.keyCode == 13)
        name = $("#newMessage input[name='name']").val();
        text = $("#newMessage input[name='text']").val();

        $("#newMessage input[name='text']").val("");

        @newMessage(name, text)

  messagesView: (name, text) ->
    listItem  = jQuery "<li/>"

    nameItem  = jQuery "<p/>", {
      class: "name"
      text: name
    }

    textItem  = jQuery "<p/>", {
      class: "text"
      text: text
    }

    listItem.appendTo  "#listMessages ul"
    nameItem.appendTo  listItem
    textItem.appendTo  listItem

  newMessage: (name, text) ->
    fireBase.push
      name: name
      text: text

myChatApp = new SimpleChat