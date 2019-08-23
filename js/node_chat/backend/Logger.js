class Logger {
  constructor(fileName) {
    this.fileName = fileName
  }

  info(msg) {
    msg = `${(new Date())} - ${this.fileName} - [INFO] - ${msg}`;
    console.log(msg);
  }


  debug(msg) {
    console.log((new Date()) + '[DEBUG] ' + msg);
  }


  error(msg) {
    console.log((new Date()) + '[ERROR] ' + msg);
  }
}

module.exports = Logger;