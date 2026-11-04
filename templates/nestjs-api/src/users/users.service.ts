import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, email: 'admin@globaledb.com', name: 'Admin User', role: 'Admin', isActive: true },
    { id: 2, email: 'diego@globaledb.com', name: 'Diego Tique', role: 'User', isActive: true },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`Usuario con ID #${id} no encontrado`);
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const email = createUserDto.email.trim().toLowerCase();
    const emailAlreadyExists = this.users.some(
      (user) => user.email.trim().toLowerCase() === email,
    );
    if (emailAlreadyExists) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const newUser: User = {
      id: this.users.length + 1,
      email,
      name: createUserDto.name,
      role: createUserDto.role || 'User',
      isActive: true,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (updateUserDto.name) user.name = updateUserDto.name;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.role) user.role = updateUserDto.role;
    return user;
  }

  remove(id: number): void {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException(`Usuario con ID #${id} no encontrado`);
    this.users.splice(idx, 1);
  }
}
