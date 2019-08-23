class Logger {
  constructor(fileName) {
    this.fileName = fileName
  }

  info(msg) {
    msg = `${this.fileName} - [INFO] - ${msg}`;
    console.log(msg);
  }


  debug(msg) {
    console.log('[DEBUG] ' + msg);
  }


  error(msg) {
    console.log('[ERROR] ' + msg);
  }
}

module.exports = Logger;