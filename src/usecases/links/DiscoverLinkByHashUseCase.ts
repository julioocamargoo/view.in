import LinkRepository from '../../repositories/LinkRepository';
import Logger from '../../commons/Logger';
import HttpError from '../../commons/errors/HttpError';

export default class DiscoverLinkByHashUseCase {
  async execute(hash: string): Promise<string> {
    try {
      if (!hash) {
        throw new HttpError('Hash inválido', 400);
      }

      const link = await LinkRepository.findByHash(hash);

      if (!link) {
        throw new HttpError('Link não encontrado', 404);
      }

      if (link.expiresAt < new Date()) {
        LinkRepository.delete(link.hash);
        throw new HttpError('Link não encontrado', 404);
      }

      return link.url;
    } catch (e) {
      Logger.error(e);
      throw new HttpError('Falha ao verificar link encurtado', 500);
    }
  }
}
