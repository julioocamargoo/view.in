import { Request, Response } from 'express';

export default class LinkController {
  static createShorterUrl(req: Request, res: Response): void {
    res.send('ok');
  }

  static findLinkByAlias(req: Request, res: Response): void {
    res.send('ok');
  }

  static deleteLinkByAlias(req: Request, res: Response): void {
    res.send('ok');
  }
}
