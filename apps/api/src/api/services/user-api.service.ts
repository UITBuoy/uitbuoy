import { Injectable } from '@nestjs/common';
import { ApiService } from '../api.service';
import WS_FUNCTION from 'src/common/constants/function-name';
import { User } from 'src/user/entities/user.entity';
import { UserNotFoundException } from 'src/user/errors/not-found.error';

@Injectable()
export class UserApiService {
    constructor(private readonly apiService: ApiService) {}

    async getUserProfile({
        token,
        username,
    }: {
        token: string;
        username: string;
    }) {
        const data = await this.apiService.fetchMoodleData<User[]>({
            token,
            functionName: WS_FUNCTION.GET_USER_PROFILE,
            params: { field: 'username', 'values[0]': username },
        });
        if (data.length == 0) {
            throw new UserNotFoundException(username);
        }
        return { ...data[0], token };
    }
}
