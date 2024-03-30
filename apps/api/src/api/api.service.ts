import { Injectable } from '@nestjs/common';
import axios from 'axios';
import API_URL from 'src/common/constants/url';
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
        params?: { [key: string]: any };
    }): Promise<T> {
        const moodleParams = {};
        Object.entries(params).forEach(([key, value]) => {
            if (value instanceof Array) {
                value.forEach(
                    (v, index) => (moodleParams[`${key}[${index}]`] = v),
                );
            } else {
                moodleParams[key] = value;
            }
        });

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
