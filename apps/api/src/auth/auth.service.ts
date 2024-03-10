import { Injectable } from '@nestjs/common';
import axios from 'axios';
import API_URL from 'src/common/constants/url';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(username: string, password: string) {
        const response = await axios.post(API_URL.authentication, null, {
            params: { username, password, service: 'moodle_mobile_app' },
        });
        if (response.status != 200) {
            throw new Error('User not found');
        } else {
            return {
                token: response.data.token,
                ...(await this.userService.findByUsername(
                    username,
                    response.data.token,
                )),
            };
        }
    }
}
