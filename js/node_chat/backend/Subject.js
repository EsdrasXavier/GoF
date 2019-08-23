const Logger = require('./Logger.js');


class Subject {

  constructor() {
    this.logger = new Logger('Subject.js');
    this.observers = [];
    this._subject_state = null;
  }

  attach(observer) {
    this.observers.push(observer);
    this.logger.info(`Adding new observer: ${observer.name}`);
  }

  detach(observer) {
    this.observer.pop(observer);
  }

  notify() {
    this.observers.forEach((obj, id) => {
      obj.update(this._subject_state);
      this.logger.info(`Notifying obj: ${obj.name}. State: ${this._subject_state}`);
    });
  }

  setSubjectState(state) {
    this._subject_state = state;
    this.notify();
  }
}

module.exports = Subject;