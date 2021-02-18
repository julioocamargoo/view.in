import { AddressInfo } from 'net';
import app from './app';
import logger from './common/logger';

const server = app.listen(5000, () => {
  const { port, address } = server.address() as AddressInfo;
  logger.info(`Server listening on: ${address}:${port}`);
});
