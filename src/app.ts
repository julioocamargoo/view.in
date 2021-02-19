import express, { Express } from 'express';
import * as bodyParser from 'body-parser';

import Database from './Database';
import Logger from './commons/Logger';
import Routes from './routes/Routes';

export default {
  start: async (): Promise<Express> => {
    await new Database().connect();

    const app = express();

    app.use(bodyParser.json());

    // TODO: Add Swagger UI
    app.get('/', (req, res) => res.send('Healthy!'));

    Routes.setup(app);

    app.listen(process.env.PORT, () => {
      Logger.info(`Server listening on: ${process.env.DOMAIN}:${process.env.PORT}`);
    });

    return app;
  },
};
