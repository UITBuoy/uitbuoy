import { Injectable } from '@nestjs/common';
import axios from 'axios';
import API_URL from 'src/common/constants/url';
import { MoodleException } from '../errors/moodle.error';
import { EventEntity } from '@/event/entities/event.entity';
import { GoogleTaskException } from '../errors/google-task.error';

@Injectable()
export class GoogleTasksApiService {
    private readonly BASE_URL = 'https://tasks.googleapis.com/tasks/v1';
    private readonly TASK_LIST_TITLE = 'UITBUOY Events List';

    async createTaskList(accessToken: string): Promise<any> {
        const response = await axios.post(
            `${this.BASE_URL}/users/@me/lists`,
            {
                title: this.TASK_LIST_TITLE,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const result = response.data;

        if (response.status != 200) {
            throw new GoogleTaskException();
        }

        return result;
    }
}
