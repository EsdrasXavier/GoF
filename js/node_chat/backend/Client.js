const Observer = require('./Observer.js');


class Client extends Observer {

  constructor(name, conn) {
    super();
    this.name = name;
    this.state = {};
    this.connection = conn;
    // console.log(this.connection)
  }

  update(state) {
    this.state = state;
    var json = JSON.stringify({ type: 'message', data: state });
    this.connection.sendUTF(json);
  }
}

module.exports = Client;