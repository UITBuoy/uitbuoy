import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(user: User) {
        return this.repo.save(user);
    }

    async findByUsername(username: string) {
        return this.repo.findOneBy({ username });
    }
}
