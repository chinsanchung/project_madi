import debug from "debug";

class Debugger {
  logger: debug.Debugger;
  errorLogger: debug.Debugger;

  constructor() {
    this.logger = debug("server");
    this.errorLogger = debug("error");
  }

  message = (...args: any[]): any => {
    this.logger(args);
  };
  errorMessage = (...args: any[]): any => {
    this.errorLogger(args);
  };
}

const Log = new Debugger();

export default Log;
