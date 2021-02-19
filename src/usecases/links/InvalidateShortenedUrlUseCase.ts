import LinkRepository from '../../repositories/LinkRepository';
import Logger from '../../commons/Logger';
import HttpError from '../../commons/errors/HttpError';

export default class InvalidateShortenedUrlUseCase {
  linkRepository: LinkRepository;

  constructor() {
    this.linkRepository = new LinkRepository();
  }

  async execute(hash: string): Promise<void> {
    try {
      if (!hash) {
        throw new HttpError('Hash inválido', 400);
      }

      const affected = await this.linkRepository.delete(hash);

      if (!affected) {
        throw new HttpError('Nenhum link encontrado por esse hash', 404);
      }
    } catch (e) {
      if (e instanceof HttpError) {
        throw e;
      }

      Logger.error(e);
      throw new HttpError('Falha ao remover link', 500);
    }
  }
}
