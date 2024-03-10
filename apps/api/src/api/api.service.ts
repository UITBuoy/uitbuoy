import { Injectable } from '@nestjs/common';
import axios from 'axios';
import WS_FUNCTION from 'src/common/constants/function-name';
import API_URL from 'src/common/constants/url';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ApiService {
    async getUserProfile({
        token,
        username,
    }: {
        token: string;
        username: string;
    }) {
        const data = await this.fetchMoodleData<User[]>({
            token,
            functionName: WS_FUNCTION.GET_USER_PROFILE,
            params: { field: 'username', 'values[0]': username },
        });
        if (data.length == 0) {
            throw new Error('User not found');
        }
        return { ...data[0], token };
    }

    async fetchMoodleData<T>({
        token,
        functionName,
        params = {},
    }: {
        token: string;
        functionName: string;
        params?: { [key: string]: string | number };
    }): Promise<T> {
        const response = await axios.get(API_URL.base, {
            params: {
                wsfunction: functionName,
                wstoken: token,
                moodlewsrestformat: 'json',
                ...params,
            },
        });
        return response.data;
    }
}
