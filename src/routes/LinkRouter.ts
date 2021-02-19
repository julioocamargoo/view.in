import express from 'express';

import LinkController from '../controllers/LinkController';

export default class LinkRouter {
  router = express.Router();

  addRoutes(): express.IRouter {
    this.createShorterUrl();
    this.findLinkByHash();
    this.deleteLinkByHash();

    return this.router;
  }

  private createShorterUrl() {
    this.router.post('/encurtador', LinkController.createShorterUrl);
  }

  private findLinkByHash() {
    this.router.get('/:hash', LinkController.findLinkByHash);
  }

  private deleteLinkByHash() {
    this.router.delete('/:hash', LinkController.deleteLinkByHash);
  }
}
