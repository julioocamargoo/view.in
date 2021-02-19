/* eslint-disable no-console */
export default class Logger {
  static error(msg: string): void {
    this.printMessage(msg, 'red');
  }

  static info(msg: unknown): void {
    this.printMessage(msg, 'blue');
  }

  private static printMessage(msg: unknown, color: string) {
    console.log(`%c ${msg}`, `color: ${color}`);
  }
}
