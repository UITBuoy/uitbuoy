import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiService } from 'src/api/api.service';
import API_URL from 'src/common/constants/url';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private apiService: ApiService,
    ) {}

    async validateUser(username: string, password: string) {
        const response = await axios.post(API_URL.authentication, null, {
            params: { username, password, service: 'moodle_mobile_app' },
        });

        if (response.status != 200) {
            throw new Error('User not found');
        } else {
            const userDataFromDB =
                await this.userService.findByUsername(username);

            if (!userDataFromDB) {
                const userData = await this.apiService.getUserProfile({
                    username,
                    token: response.data.token,
                });

                await this.userService.create(userData);

                return {
                    token: response.data.token,
                    ...userData,
                };
            }

            return {
                token: response.data.token,
                ...userDataFromDB,
            };
        }
    }
}
