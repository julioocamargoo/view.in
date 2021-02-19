import InvalidateShortenedUrlUseCase from '../../src/usecases/links/InvalidateShortenedUrlUseCase';
import HttpError from '../../src/commons/errors/HttpError';
import LinkRepository from '../../src/repositories/LinkRepository';

jest.mock('../../src/commons/Logger');

const invalidateShortenedUrlUseCase = new InvalidateShortenedUrlUseCase();

describe('InvalidateShortenedUrlUseCase', () => {
  test('Missing hash should return 400', async () => {
    await expect(async () => {
      await invalidateShortenedUrlUseCase.execute('');
    }).rejects.toThrow(new HttpError('Hash inválido', 400));
  });

  test('Not found hash should return 404', async () => {
    LinkRepository.prototype.delete = jest.fn().mockResolvedValue(false);

    await expect(async () => {
      await invalidateShortenedUrlUseCase.execute('1f1gFG3c');
    }).rejects.toThrow(new HttpError('Nenhum link encontrado por esse hash', 404));
  });

  test('Any no handled repository error should return 500', async () => {
    LinkRepository.prototype.delete = jest.fn().mockRejectedValue(new Error());

    await expect(async () => {
      await invalidateShortenedUrlUseCase.execute('1f1gFG3c');
    }).rejects.toThrow(new HttpError('Falha ao remover link', 500));
  });

  test('Should be successful', async () => {
    LinkRepository.prototype.delete = jest.fn().mockResolvedValue(true);

    await invalidateShortenedUrlUseCase.execute('1f1gFG3c');

    expect(LinkRepository.prototype.delete).toBeCalled();
  });
});
