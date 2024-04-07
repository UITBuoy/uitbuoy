import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoogleUserInput } from '../dto/create-google-user.input';
import { GoogleUser } from '../entities/google-user.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class GoogleUserService {
    constructor(
        @InjectRepository(GoogleUser)
        private googleUserRepo: Repository<GoogleUser>,
    ) {}

    async findById(id: string) {
        return this.googleUserRepo.findOneBy({ id });
    }
}
