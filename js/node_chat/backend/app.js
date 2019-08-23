"use strict";

process.title = 'node-chat';

const WEB_SOCKET_PORT = 1337;
// websocket and http servers
const webSocketServer = require('websocket').server;
const http = require('http');
const Subject = require('./Subject.js');
const Client = require('./Client.js')
const Logger = require('./Logger.js');

/**
 * Global variables
 */
var subject = new Subject();
var logger = new Logger('App.js');

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
colors.sort(function(a,b) { return Math.random() > 0.5; } );


/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});

server.listen(WEB_SOCKET_PORT, () => {
  logger.info(`Server listening on port: ${WEB_SOCKET_PORT}`);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});


// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', (request) => {
  logger.info(`Connection from origin: ${request.origin}.`);

  var connection = request.accept(null, request.origin);
  var userName = false;

  logger.info('Connection accepted.');


    // user sent some message
  connection.on('message', (message) => {
    if (message.type === 'utf8') { // accept only text
      // first message sent by user is their name
      if (userName === false) {
        userName = htmlEntities(message.utf8Data);
        subject.attach(new Client(userName, connection));
        logger.info(`User is know as: ${userName}`);
      } else { // log and broadcast the message
        logger.info(`Received message from ${userName}: ${message.utf8Data}`);

        var obj = {
          time: (new Date()).getTime(),
          text: message.utf8Data,
          author: userName
        };

        subject.setSubjectState(obj);
      }
    }
  });

  // uUer disconnected
  connection.on('close', (conn, data) => {
    // console.log(connection, data);

    if (subject.observers.length > 0) {
      logger.info(`Peer ${connection.remoteAddress} disconnected.`)
      // subject.detach(connection);
    }
  });
});
