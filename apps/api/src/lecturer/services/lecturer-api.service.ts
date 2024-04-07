import { ApiService } from '@/api/services/api.service';
import { Injectable } from '@nestjs/common';
import { Lecturer } from '../lecturer.entity';
import WS_FUNCTION from '@/common/constants/function-name';

@Injectable()
export class LecturerApiService {
    constructor(private readonly apiService: ApiService) {}

    async getLecturerProfile({
        token,
        id,
    }: {
        token: string;
        id: number;
    }): Promise<Lecturer> {
        const data = await this.apiService.fetchMoodleData<Lecturer[]>({
            token,
            functionName: WS_FUNCTION.GET_USER_BY_FIELD,
            params: { field: 'id', 'values[0]': id },
        });

        return data[0];
    }
}
