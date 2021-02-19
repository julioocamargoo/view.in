import DiscoverLinkByHashUseCase from '../../src/usecases/links/DiscoverLinkByHashUseCase';
import HttpError from '../../src/commons/errors/HttpError';
import LinkRepository from '../../src/repositories/LinkRepository';
import Link from '../../src/entities/Link';

jest.mock('../../src/commons/Logger');

const discoverLinkByHashUseCase = new DiscoverLinkByHashUseCase();

describe('DiscoverLinkByHashUseCase', () => {
  test('Missing hash should return 400', async () => {
    await expect(async () => {
      await discoverLinkByHashUseCase.execute('');
    }).rejects.toThrow(new HttpError('Hash inválido', 400));
  });

  test('Not found hash should return 404', async () => {
    LinkRepository.prototype.findByHash = jest.fn().mockResolvedValue(undefined);

    await expect(async () => {
      await discoverLinkByHashUseCase.execute('1f1gFG3c');
    }).rejects.toThrow(new HttpError('Link não encontrado', 404));
  });

  test('Hash expired should return 404', async () => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    const link = new Link();
    link.expiresAt = date;
    LinkRepository.prototype.findByHash = jest.fn().mockResolvedValue(link);
    LinkRepository.prototype.delete = jest.fn().mockResolvedValue(true);

    await expect(async () => {
      await discoverLinkByHashUseCase.execute('1f1gFG3c');
    }).rejects.toThrow(new HttpError('Link expirado', 404));
  });

  test('Any no handled repository error should return 500', async () => {
    LinkRepository.prototype.findByHash = jest.fn().mockRejectedValue(new Error());

    await expect(async () => {
      await discoverLinkByHashUseCase.execute('1f1gFG3c');
    }).rejects.toThrow(new HttpError('Falha ao verificar link encurtado', 500));
  });

  test('Should be successful and return original url', async () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const link = new Link();
    link.expiresAt = date;
    link.url = 'http://test.test';
    LinkRepository.prototype.findByHash = jest.fn().mockResolvedValue(link);

    const result = await discoverLinkByHashUseCase.execute('1f1gFG3c');

    expect(LinkRepository.prototype.findByHash).toBeCalled();
    expect(result).toBe(link.url);
  });
});
