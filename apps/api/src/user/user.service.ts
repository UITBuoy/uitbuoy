import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiService } from 'src/api/api.service';
import WS_FUNCTION from 'src/common/constants/function-name';

@Injectable()
export class UserService {
    constructor(private readonly apiService: ApiService) {}

    create() {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async findByUsername(username: string, token: string) {
        return this.apiService.getUserProfile({ token, username });
    }
}
