import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from '../entities/google-user.entity';

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
