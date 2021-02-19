import { Request, Response } from 'express';

import {
  GenerateShorterLinkUseCase,
  DiscoverLinkByHashUseCase,
  InvalidateShortenedUrlUseCase,
} from '../usecases/links';

export default class LinkController {
  static async createShorterUrl(req: Request, res: Response): Promise<void> {
    try {
      const generateShorterLinkUseCase = new GenerateShorterLinkUseCase();
      const link = await generateShorterLinkUseCase.execute(req.body.url);
      res.status(201).json({ viewin: link });
    } catch (e) {
      res.status(e.code).json({ message: e.message });
    }
  }

  static async discoverLinkByHash(req: Request, res: Response): Promise<void> {
    try {
      const discoverLinkByHashUseCase = new DiscoverLinkByHashUseCase();
      const url = await discoverLinkByHashUseCase.execute(req.query.hash as string);

      res.redirect(url);
    } catch (e) {
      res.status(e.code).json({ message: e.message });
    }
  }

  static async deleteLinkByHash(req: Request, res: Response): Promise<void> {
    try {
      const invalidateShortenedUrlUseCase = new InvalidateShortenedUrlUseCase();
      await invalidateShortenedUrlUseCase.execute(req.query.hash as string);

      res.status(204).send();
    } catch (e) {
      res.status(e.code).json({ message: e.message });
    }
  }
}
