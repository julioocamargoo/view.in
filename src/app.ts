import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import { AddressInfo } from 'net';

import Database from './Database';
import Logger from './commons/Logger';
import Routes from './routes/Routes';

export default {
  start: async (): Promise<Express> => {
    await Database.connect();

    const app = express();

    app.use(bodyParser.json());

    app.get('/', (req, res) => res.send('Healthy!'));

    Routes.setup(app);

    const server = app.listen(5000, () => {
      const { port, address } = server.address() as AddressInfo;
      Logger.info(`Server listening on: ${address}:${port}`);
    });

    return app;
  },
};
