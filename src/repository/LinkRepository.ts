import { getRepository } from 'typeorm';
import Link from '../entity/Link';

export default class LinkRepository {
  static async save(link: Link): Promise<void> {
    await getRepository(Link).save(link);
  }

  static async findByAlias(alias: string): Promise<void> {
    await getRepository(Link).findOne({ alias });
  }

  static async delete(alias: string): Promise<void> {
    await getRepository(Link).delete({ alias });
  }
}
