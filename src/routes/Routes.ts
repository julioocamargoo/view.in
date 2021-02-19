import { Express } from 'express';

import LinkRouter from './LinkRouter';

export default class Routes {
  static setup(server: Express): void {
    server.use('/', new LinkRouter().addRoutes());
  }
}
