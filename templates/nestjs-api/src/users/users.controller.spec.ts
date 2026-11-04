import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UsersModule } from './users.module';

describe('UsersController', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(0);

    const address = app.getHttpServer().address();
    if (address === null || typeof address === 'string') {
      throw new Error('No se pudo determinar el puerto de pruebas');
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates users with HTTP 201 and lists them with HTTP 200', async () => {
    const createResponse = await createUser({
      email: ' New.User@Example.com ',
      name: 'New User',
    });

    expect(createResponse.status).toBe(201);
    await expect(createResponse.json()).resolves.toMatchObject({
      email: 'new.user@example.com',
      name: 'New User',
    });

    const listResponse = await fetch(`${baseUrl}/users`);

    expect(listResponse.status).toBe(200);
    await expect(listResponse.json()).resolves.toHaveLength(3);
  });

  it.each([
    { email: 'valid@example.com', name: '' },
    { email: 'valid@example.com', name: '   ' },
    { email: 'not-an-email', name: 'Valid Name' },
  ])('rejects invalid input with HTTP 400: %o', async (user) => {
    const response = await createUser(user);

    expect(response.status).toBe(400);
  });

  it('rejects duplicate emails ignoring case and surrounding spaces with HTTP 409', async () => {
    const response = await createUser({
      email: ' ADMIN@GLOBALEDB.COM ',
      name: 'Another Admin',
    });

    expect(response.status).toBe(409);
  });

  function createUser(user: { email: string; name: string }) {
    return fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    });
  }
});
