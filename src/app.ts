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

    app.listen(process.env.EXTERNAL_API_PORT, () => {
      Logger.info(`Server listening on: ${process.env.EXTERNAL_API_DOMAIN}:${process.env.EXTERNAL_API_PORT}`);
    });

    return app;
  },
};
