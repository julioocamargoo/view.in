/* eslint-disable no-console */

const printMessage = (msg: string, color: string) => console.log(`%c ${msg}`, `color: ${color}`);

const logger = {
  error: (msg: string): void => printMessage(msg, 'red'),
  info: (msg: string): void => printMessage(msg, 'blue'),
};

export default logger;
