import { getRepository } from 'typeorm';

import Link from '../entities/Link';

export default class LinkRepository {
  async save(link: Link): Promise<Link> {
    return getRepository(Link).save(link);
  }

  async findByHash(hash: string): Promise<Link | undefined> {
    return getRepository(Link).findOne({ hash });
  }

  async delete(hash: string): Promise<boolean> {
    const result = await getRepository(Link).delete({ hash });

    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
