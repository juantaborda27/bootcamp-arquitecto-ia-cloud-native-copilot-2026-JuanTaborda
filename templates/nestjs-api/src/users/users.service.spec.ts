import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe retornar lista de usuarios iniciales', () => {
    const users = service.findAll();
    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  it('debe crear un nuevo usuario correctamente', () => {
    const newUser = service.create({
      email: 'test@globaledb.com',
      name: 'Test User',
      role: 'User',
    });
    expect(newUser.id).toBeDefined();
    expect(newUser.email).toBe('test@globaledb.com');
  });

  it('debe encontrar usuario por ID', () => {
    const user = service.findOne(1);
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });
});
