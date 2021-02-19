import GenerateShorterLinkUseCase from '../../src/usecases/links/GenerateShorterLinkUseCase';
import HttpError from '../../src/commons/errors/HttpError';
import LinkRepository from '../../src/repositories/LinkRepository';
import Link from '../../src/entities/Link';

jest.mock('../../src/commons/Logger');

const generateShorterLinkUseCase = new GenerateShorterLinkUseCase();

describe('generateShorterLinkUseCase', () => {
  test('Missing url should return 400', async () => {
    await expect(async () => {
      await generateShorterLinkUseCase.execute('');
    }).rejects.toThrow(new HttpError('Url não informada', 400));
  });

  test('Any no handled repository error should return 500', async () => {
    LinkRepository.prototype.save = jest.fn().mockRejectedValue(new Error());

    await expect(async () => {
      await generateShorterLinkUseCase.execute('http://test.test');
    }).rejects.toThrow(new HttpError('Falha ao gerar url minificada', 500));
  });

  test('Should be successful and return minified url', async () => {
    const link = new Link();
    link.hash = 'cfj9SD30';
    LinkRepository.prototype.save = jest.fn().mockResolvedValue(link);

    const result = await generateShorterLinkUseCase.execute('http://test.test');

    expect(LinkRepository.prototype.save).toBeCalled();
    const protocol = process.env.IS_SECURE_HTTP === 'true' ? 'https' : 'http';
    expect(result).toBe(`${protocol}://${process.env.DOMAIN}:${process.env.PORT}/${link.hash}`);
  });
});
