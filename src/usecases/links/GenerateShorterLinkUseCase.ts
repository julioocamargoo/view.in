import { customAlphabet, nanoid } from 'nanoid';

import Link from '../../entities/Link';
import LinkRepository from '../../repositories/LinkRepository';
import Logger from '../../commons/Logger';
import HttpError from '../../commons/errors/HttpError';

export default class GenerateShorterLinkUseCase {
  readonly DEFAULT_HASH_SIZE = 8;

  readonly DEFAULT_EXPIRATION_TIME_IN_MINUTES = 525600;

  linkRepository: LinkRepository;

  constructor() {
    this.linkRepository = new LinkRepository();
  }

  async execute(url: string): Promise<string | undefined> {
    if (!url) {
      throw new HttpError('Url não informada', 400);
    }
    try {
      const link = new Link();
      link.hash = this.generateHash();
      link.url = url;
      link.expiresAt = this.generateExpirationDate();
      const savedLink = await this.linkRepository.save(link);
      return this.generateShorterUrl(savedLink.hash);
    } catch (e) {
      if (e instanceof HttpError) {
        throw e;
      }

      Logger.error(e);
      throw new HttpError('Falha ao gerar url minificada', 500);
    }
  }

  private generateHash(): string {
    const alphabet = process.env.ALLOWED_HASH_CHARACTERS;
    const size = Number(process.env.URL_HASH_SIZE) || this.DEFAULT_HASH_SIZE;
    if (alphabet) {
      const generate = customAlphabet(alphabet, size);
      return generate();
    }

    return nanoid(size);
  }

  private generateExpirationDate(): Date {
    const expirationTime = Number(process.env.URL_TTL_IN_MINUTES)
      || this.DEFAULT_EXPIRATION_TIME_IN_MINUTES;
    const date = new Date();
    date.setMinutes(date.getMinutes() + expirationTime);
    return date;
  }

  private generateShorterUrl(hash: string): string {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    let port;
    if (process.env.NODE_ENV !== 'production') {
      port = `:${process.env.PORT}`;
    }

    return `${protocol}://${process.env.DOMAIN}${port}/${hash}`;
  }
}
