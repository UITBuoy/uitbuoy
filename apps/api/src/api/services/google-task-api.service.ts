import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleTaskException } from '../errors/google-task.error';
import { TaskListDto } from '../dto/task-list.dto';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class GoogleTasksApiService {
    private readonly BASE_URL = 'https://tasks.googleapis.com/tasks/v1';
    private readonly TASK_LIST_TITLE = 'UITBUOY Events List';

    async createTaskList(accessToken: string): Promise<TaskListDto> {
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

    async createTask({
        accessToken,
        title,
        notes,
        due,
        taskList,
    }: {
        accessToken: string;
        title: string;
        notes: string;
        due: string;
        taskList: string;
    }): Promise<TaskDto> {
        const response = await axios.post(
            `${this.BASE_URL}/lists/${taskList}/tasks`,
            { title, notes, due },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const result = response.data;

        if (response.status != 200) {
            throw new GoogleTaskException();
        }

        return result;
    }

    async updateTask({
        accessToken,
        title,
        notes,
        due,
        taskList,
        taskId,
    }: {
        accessToken: string;
        title: string;
        notes: string;
        due: string;
        taskList: string;
        taskId: string;
    }): Promise<TaskDto> {
        const response = await axios.post(
            `${this.BASE_URL}/lists/${taskList}/tasks/${taskId}`,
            { title, notes, due },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const result = response.data;

        if (response.status != 200) {
            throw new GoogleTaskException();
        }

        return result;
    }
}
