import express from 'express';

import LinkController from '../controllers/LinkController';

export default class LinkRouter {
  router = express.Router();

  addRoutes(): express.IRouter {
    this.createShorterUrl();
    this.findLinkByAlias();
    this.deleteLinkByAlias();

    return this.router;
  }

  private createShorterUrl() {
    this.router.post('/', LinkController.createShorterUrl);
  }

  private findLinkByAlias() {
    this.router.get('/', LinkController.findLinkByAlias);
  }

  private deleteLinkByAlias() {
    this.router.delete('/', LinkController.deleteLinkByAlias);
  }
}
