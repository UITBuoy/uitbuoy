import { ApiService } from "@/api/services/api.service";
import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../errors/not-found.error";

@Injectable()
export class UserApiService {
    constructor(private readonly apiService: ApiService) {}

    async getMajor({
        token,
        username,
    }: {
        token: string;
        username: string;
    }) {
        const data = await this.apiService.fetchMoodleData<any[]>({
            token,
            functionName: 'core_user_get_users',
            params: { criteria: [{ key: 'username', value: username }] },
        });
        if (data.length == 0) {
            throw new UserNotFoundException(username);
        }
        return data[0];
    }
}