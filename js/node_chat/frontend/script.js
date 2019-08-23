$(() => {
  "use strict";
  // for better performance - to avoid searching in DOM
  let content = $('#content');
  let input = $('#input');
  let status = $('#status');
  let serverStatus = $('#server_status');

  // my name sent to the server
  var myName = false;

  window.WebSocket = window.WebSocket || window.MozWebSocket;

  if (!window.WebSocket) {
    content.html($('<p>', { text:'Sorry, but your browser doesn\'t support WebSocket.'}));
    input.hide();
    $('span').hide();
    return;
  }

  var connection = new WebSocket('ws://127.0.0.1:1337');
  connection.onopen = () => {
    // first we want users to enter their names
    input.removeAttr('disabled');
    status.text('Choose a name:');
    updateServerStatus(true);
  };

  connection.onerror = (error) => {
    console.error(error)
    updateServerStatus(false);
    content.html($('<p>', {
      text: 'Sorry, but there\'s some problem with your connection or the server is down.'
    }));
  };

  // most important part - incoming messages
  connection.onmessage = (message) => {

    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
    }


    if (json.type === 'message') { // it's a single message
      // let the user write another message
      console.log(json)
      input.removeAttr('disabled');
      addMessage(json.data.author, json.data.text, json.data.color, new Date(json.data.time));
    } else {
      console.log(`Hmm..., I\'ve never seen JSON like this: ${json}`);
    }
  };

  /**
   * Send message when user presses Enter key
   */
  input.keydown((e) => {
    if (e.keyCode === 13) {
      let _in = $('#input');
      let msg = _in.val();
      if (!msg) return;

      // send the message as an ordinary text
      connection.send(msg);
      _in.val('');

      if (myName === false) {
        myName = msg;
        status.text(myName + ': ');
      }
    }
  });

  setInterval(() => {
    if (connection.readyState !== 1) {
      updateServerStatus(false);
      status.text('Error');
      input.attr('disabled', 'disabled').val('Unable to communicate with the WebSocket server.');
    }
  }, 3000);

  /**
   * Add message to the chat window
   */
  var addMessage = (author, message, color, dt) => {
    content.append('<p><span style="color:' + color + '">'
        + author + '</span> @ ' + (dt.getHours() < 10 ? '0'
        + dt.getHours() : dt.getHours()) + ':'
        + (dt.getMinutes() < 10
          ? '0' + dt.getMinutes() : dt.getMinutes())
        + ': ' + message + '</p>');
  }


  var updateServerStatus = (state) => {
    if (state)
      serverStatus.css('background-color', '#0F0');
    else
      serverStatus.css('background-color', '#F00');
  }
});