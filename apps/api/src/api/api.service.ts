import { Injectable } from '@nestjs/common';
import axios from 'axios';
import WS_FUNCTION from 'src/common/constants/function-name';
import API_URL from 'src/common/constants/url';
import { User } from 'src/user/entities/user.entity';
import { UserNotFoundException } from 'src/user/errors/not-found.error';
import { MoodleException } from './errors/moodle.error';

@Injectable()
export class ApiService {
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
        const result = response.data;

        if (result.exception) {
            throw new MoodleException(
                result.exception,
                result.errorcode,
                result.message,
            );
        }

        return result;
    }
}
