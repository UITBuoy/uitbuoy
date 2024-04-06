import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoogleUserInput } from './dto/create-google-user.input';
import { GoogleUser } from './entities/google-user.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        @InjectRepository(GoogleUser)
        private googleUserRepo: Repository<GoogleUser>,
    ) {}

    async createGoogleUser(googleUser: CreateGoogleUserInput, user: User) {
        if (user) googleUser.user = user;
        return this.googleUserRepo.save(googleUser);
    }

    async create(user: User) {
        return this.repo.save(user);
    }

    async findByUsername(username: string) {
        return this.repo.findOneBy({ username });
    }

    async findById(id: number) {
        return this.repo.findOneBy({ id });
    }
}
