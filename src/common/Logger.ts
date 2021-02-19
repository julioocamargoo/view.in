/* eslint-disable no-console */
export default class Logger {
  static error(msg: string): void {
    this.printMessage(msg, 'red');
  }

  static info(msg: string): void {
    this.printMessage(msg, 'blue');
  }

  private static printMessage(msg: string, color: string) {
    console.log(`%c ${msg}`, `color: ${color}`);
  }
}
